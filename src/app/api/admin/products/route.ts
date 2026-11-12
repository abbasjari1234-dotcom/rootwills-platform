import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/security/auth-guard';
import { handleApiError } from '@/lib/security/error-handler';

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
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    let allProducts: any[] = [];

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

    if (search) {
      allProducts = allProducts.filter(p =>
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
      items
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
      list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    if (action === 'create') {
      // Check if SKU exists
      const existing = list.find((p: any) => p.sku === product.sku);
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
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
      return NextResponse.json({ success: true, product: newProduct });
    } else if (action === 'update') {
      const index = list.findIndex((p: any) => p.sku === product.sku || p.id === product.id);
      if (index === -1) {
        // Search across all category files in case category was moved
        const dir = getProductsDir();
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
        let found = false;

        for (const f of files) {
          const fPath = path.join(dir, f);
          const fList = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
          const fIdx = fList.findIndex((p: any) => p.sku === product.sku || p.id === product.id);
          if (fIdx !== -1) {
            fList[fIdx] = { ...fList[fIdx], ...product };
            fs.writeFileSync(fPath, JSON.stringify(fList, null, 2), 'utf-8');
            found = true;
            return NextResponse.json({ success: true, product: fList[fIdx] });
          }
        }

        if (!found) {
          return NextResponse.json({ error: 'Product not found to update' }, { status: 404 });
        }
      } else {
        list[index] = { ...list[index], ...product };
        fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
        return NextResponse.json({ success: true, product: list[index] });
      }
    } else if (action === 'delete') {
      const initialLength = list.length;
      list = list.filter((p: any) => p.sku !== product.sku && p.id !== product.id);
      if (list.length < initialLength) {
        fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
        return NextResponse.json({ success: true, deletedSku: product.sku });
      }

      // If not in targeted file, search all json files
      const dir = getProductsDir();
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
      for (const f of files) {
        const fPath = path.join(dir, f);
        let fList = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
        const fLen = fList.length;
        fList = fList.filter((p: any) => p.sku !== product.sku && p.id !== product.id);
        if (fList.length < fLen) {
          fs.writeFileSync(fPath, JSON.stringify(fList, null, 2), 'utf-8');
          return NextResponse.json({ success: true, deletedSku: product.sku });
        }
      }

      return NextResponse.json({ error: 'Product not found to delete' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Operation failed' }, { status: 500 });
  }
}

