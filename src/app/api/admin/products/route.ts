import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/security/auth-guard';
import { handleApiError } from '@/lib/security/error-handler';
import { WHOLESALE_PRODUCTS } from '@/data/wholesaleProducts';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const categoryFileMap: Record<string, string> = {
  'bakery-breakfast': 'bakery.json',
  'meat-poultry': 'meat.json',
  'chilled-dairy': 'dairy.json',
  'tea-coffee': 'drinks.json',
  'fresh-produce': 'produce.json',
  'seafood-fish': 'seafood.json',
  'frozen-chips': 'frozen.json',
  'desserts-icecream': 'desserts.json',
  'oil-fats': 'oils.json',
  'rice-pasta': 'ricepasta.json',
  'spices-sauces': 'spices.json',
  'everyday-grocery': 'grocery.json',
  'packaging-hygiene': 'grocery.json',
};

// In-memory runtime cache for serverless lifecycles
interface CatalogStore {
  overrides: Record<string, any>;
  created: any[];
  deleted: string[];
}

let runtimeStore: CatalogStore = {
  overrides: {},
  created: [],
  deleted: [],
};

const OVERRIDE_SYSTEM_EMAIL = 'ops-catalog-overrides@rootwills.internal';

async function fetchCloudOverrides(): Promise<CatalogStore> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return runtimeStore;

    const { data, error } = await supabase
      .from('leads')
      .select('notes')
      .eq('email', OVERRIDE_SYSTEM_EMAIL)
      .maybeSingle();

    if (data?.notes) {
      const parsed = JSON.parse(data.notes);
      runtimeStore = {
        overrides: { ...runtimeStore.overrides, ...(parsed.overrides || {}) },
        created: [...(parsed.created || []), ...runtimeStore.created],
        deleted: Array.from(new Set([...(parsed.deleted || []), ...runtimeStore.deleted])),
      };
    }
  } catch (err: any) {
    console.warn('[Products API] Notice fetching cloud overrides:', err?.message || err);
  }
  return runtimeStore;
}

async function persistCloudOverrides(store: CatalogStore) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return;

    const jsonNotes = JSON.stringify(store);
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', OVERRIDE_SYSTEM_EMAIL)
      .maybeSingle();

    if (existing?.id) {
      await supabase
        .from('leads')
        .update({
          notes: jsonNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('leads').insert({
        company_name: 'Rootwills Central Catalog Store',
        contact_name: 'Catalog Manager',
        email: OVERRIDE_SYSTEM_EMAIL,
        phone: '+447984709478',
        postcode: 'B5 4RB',
        sector: 'fine_dining',
        source: 'website',
        status: 'new_lead',
        notes: jsonNotes,
      });
    }
  } catch (err: any) {
    console.warn('[Products API] Notice persisting cloud overrides:', err?.message || err);
  }
}

function safeWriteJson(filePath: string, data: any): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err: any) {
    // Gracefully handle EROFS on Vercel / AWS Lambda read-only serverless filesystem
    console.warn(`[Products API] Local disk is read-only (${err.code || err.message}), stored in cloud catalog store.`);
    return false;
  }
}

function getProductsDir() {
  return path.join(process.cwd(), 'src', 'data', 'products');
}

// GET: Search or list products with pagination (Administrative only)
export async function GET(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get('search') || '').toLowerCase().trim();
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const dir = getProductsDir();
    let allProducts: any[] = [];

    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
      for (const file of files) {
        if (category && categoryFileMap[category] && categoryFileMap[category] !== file) {
          continue;
        }
        try {
          const content = fs.readFileSync(path.join(dir, file), 'utf-8');
          const list = JSON.parse(content);
          allProducts.push(...list);
        } catch (e) {
          console.error(`Error reading ${file}:`, e);
        }
      }
    }

    // Fallback to static wholesale catalog if file read is empty
    if (allProducts.length === 0 && Array.isArray(WHOLESALE_PRODUCTS) && WHOLESALE_PRODUCTS.length > 0) {
      allProducts = [...WHOLESALE_PRODUCTS];
      if (category) {
        allProducts = allProducts.filter((p) => p.categorySlug === category);
      }
    }

    // Load any cloud & runtime overrides
    const cloudStore = await fetchCloudOverrides();

    // 1. Exclude deleted products
    if (cloudStore.deleted && cloudStore.deleted.length > 0) {
      const deletedSet = new Set(cloudStore.deleted);
      allProducts = allProducts.filter((p) => !deletedSet.has(p.sku) && !deletedSet.has(p.id));
    }

    // 2. Apply property overrides (images, prices, titles, etc.)
    if (cloudStore.overrides && Object.keys(cloudStore.overrides).length > 0) {
      allProducts = allProducts.map((p) => {
        const override = cloudStore.overrides[p.sku] || cloudStore.overrides[p.id];
        return override ? { ...p, ...override } : p;
      });
    }

    // 3. Prepend newly created custom products
    if (cloudStore.created && cloudStore.created.length > 0) {
      const existingSkus = new Set(allProducts.map((p) => p.sku));
      const newItems = cloudStore.created.filter((p) => {
        if (existingSkus.has(p.sku)) return false;
        if (category && p.categorySlug !== category) return false;
        return true;
      });
      allProducts = [...newItems, ...allProducts];
    }

    // 4. Apply search filtering
    if (search) {
      allProducts = allProducts.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(search)) ||
          (p.sku && p.sku.toLowerCase().includes(search)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(search)) ||
          (p.description && p.description.toLowerCase().includes(search))
      );
    }

    const total = allProducts.length;
    const startIndex = (page - 1) * limit;
    const items = allProducts.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

// POST: Add new product, Update, or Delete existing product (Administrative only)
export async function POST(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  try {
    const body = await req.json();
    const { action, product } = body || {};

    if (!product || (!product.sku && !product.id)) {
      return NextResponse.json({ error: 'Missing required product field (sku or id)' }, { status: 400 });
    }

    if ((action === 'create' || action === 'update') && !product.name) {
      return NextResponse.json({ error: 'Missing required product name' }, { status: 400 });
    }

    const catSlug = product.categorySlug || 'everyday-grocery';
    const fileName = categoryFileMap[catSlug] || 'grocery.json';
    const filePath = path.join(getProductsDir(), fileName);

    let list: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        list = [];
      }
    }

    // Refresh cloud overrides
    const store = await fetchCloudOverrides();

    if (action === 'create') {
      const existing = list.find((p: any) => p.sku === product.sku) || store.created.find((p: any) => p.sku === product.sku);
      if (existing) {
        return NextResponse.json({ error: `Product SKU ${product.sku} already exists` }, { status: 400 });
      }

      const newProduct = {
        id: product.id || `rw-${product.sku}`,
        sku: product.sku,
        name: product.name,
        packSize: product.packSize || '1 Unit',
        categorySlug: catSlug,
        subcategory: product.subcategory || 'General',
        image: product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        origin: product.origin || 'UK Assured',
        tempZone: product.tempZone || 'Ambient',
        description: product.description || '',
        price: product.price ? parseFloat(product.price) : undefined,
        costPrice: product.costPrice ? parseFloat(product.costPrice) : undefined,
        featuredCore: !!product.featuredCore,
      };

      list.unshift(newProduct);
      safeWriteJson(filePath, list);

      store.created.unshift(newProduct);
      await persistCloudOverrides(store);

      return NextResponse.json({ success: true, product: newProduct });
    } else if (action === 'update') {
      const targetSku = product.sku || product.id;

      // Update in local file if available
      let fileFound = false;
      const index = list.findIndex((p: any) => p.sku === targetSku || p.id === targetSku);
      if (index !== -1) {
        list[index] = { ...list[index], ...product };
        safeWriteJson(filePath, list);
        fileFound = true;
      } else {
        const dir = getProductsDir();
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
          for (const f of files) {
            const fPath = path.join(dir, f);
            try {
              const fList = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
              const fIdx = fList.findIndex((p: any) => p.sku === targetSku || p.id === targetSku);
              if (fIdx !== -1) {
                fList[fIdx] = { ...fList[fIdx], ...product };
                safeWriteJson(fPath, fList);
                fileFound = true;
                break;
              }
            } catch (e) {
              // Ignore read errors
            }
          }
        }
      }

      // Always update cloud override store
      const existingOverride = store.overrides[targetSku] || {};
      store.overrides[targetSku] = { ...existingOverride, ...product };

      // Also update in store.created if it was a custom added product
      const createdIdx = store.created.findIndex((p: any) => p.sku === targetSku || p.id === targetSku);
      if (createdIdx !== -1) {
        store.created[createdIdx] = { ...store.created[createdIdx], ...product };
      }

      await persistCloudOverrides(store);

      return NextResponse.json({ success: true, product: { ...product, sku: targetSku } });
    } else if (action === 'delete') {
      const targetSku = product.sku || product.id;

      // Remove from local file if writable
      const initialLength = list.length;
      list = list.filter((p: any) => p.sku !== targetSku && p.id !== targetSku);
      if (list.length < initialLength) {
        safeWriteJson(filePath, list);
      } else {
        const dir = getProductsDir();
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
          for (const f of files) {
            const fPath = path.join(dir, f);
            try {
              let fList = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
              const fLen = fList.length;
              fList = fList.filter((p: any) => p.sku !== targetSku && p.id !== targetSku);
              if (fList.length < fLen) {
                safeWriteJson(fPath, fList);
                break;
              }
            } catch (e) {
              // Ignore
            }
          }
        }
      }

      // Record in cloud deleted store
      if (!store.deleted.includes(targetSku)) {
        store.deleted.push(targetSku);
      }
      delete store.overrides[targetSku];
      store.created = store.created.filter((p: any) => p.sku !== targetSku && p.id !== targetSku);

      await persistCloudOverrides(store);

      return NextResponse.json({ success: true, deletedSku: targetSku });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Operation failed' }, { status: 500 });
  }
}
