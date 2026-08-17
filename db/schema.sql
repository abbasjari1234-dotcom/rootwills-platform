-- ============================================================================
-- ROOTWILLS LTD — B2B WHOLESALE PLATFORM
-- PostgreSQL / Supabase schema
-- ============================================================================
-- Run in the Supabase SQL editor, or via `supabase db push` with this file
-- under supabase/migrations/. Assumes Supabase Auth (auth.users) is enabled.
-- ============================================================================

-- ---------- ENUMS ----------------------------------------------------------

create type user_role as enum ('admin', 'purchaser', 'finance');

create type sector as enum (
  'fine_dining',
  'boutique_hotel',
  'luxury_catering',
  'private_club',
  'artisan_cafe',
  'other'
);

create type credit_tier as enum ('standard', 'premium', 'concierge');

create type application_status as enum (
  'pending',
  'auto_approved',
  'concierge_review',
  'approved',
  'rejected'
);

create type order_status as enum (
  'draft',
  'submitted',
  'confirmed',
  'picking',
  'dispatched',
  'delivered',
  'cancelled'
);

create type invoice_status as enum ('open', 'paid', 'overdue', 'void');

-- ---------- DEPOTS -----------------------------------------------------------
-- Regional fulfilment centres used for postcode -> depot routing.

create table depots (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null,
  postcode text not null,
  latitude double precision not null,
  longitude double precision not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- ORGANIZATIONS -----------------------------------------------------
-- One row per trade account / client business.

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_reg_number text,
  vat_number text,
  sector sector not null,
  billing_address jsonb,
  depot_id uuid references depots(id),
  credit_tier credit_tier not null default 'standard',
  credit_limit numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- PROFILES -----------------------------------------------------------
-- Extends auth.users. One profile per Supabase Auth user.

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  role user_role not null default 'purchaser',
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- ---------- ONBOARDING APPLICATIONS ---------------------------------------
-- Raw submissions from the conversational onboarding flow, before an
-- organization/profile is provisioned (or routed to concierge review).

create table onboarding_applications (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  sector sector not null,
  company_reg_number text,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  postcode text not null,
  estimated_weekly_spend numeric(10, 2),
  weekly_covers integer,
  multi_location boolean not null default false,
  site_count integer default 1,
  nearest_depot_id uuid references depots(id),
  status application_status not null default 'pending',
  credit_tier_requested credit_tier not null default 'standard',
  organization_id uuid references organizations(id), -- set once provisioned
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- PRODUCTS -----------------------------------------------------------

create table products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  category text not null,
  description text,
  unit text,
  base_price numeric(10, 2) not null,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- CRM LEADS ---------------------------------------------------------
-- Inquiries, quote requests, and website leads flowing into the Sales pipeline.

create type lead_status as enum (
  'new_lead',
  'contacted',
  'interested',
  'price_list_sent',
  'quote_sent',
  'account_opened',
  'lost'
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  sector sector not null default 'fine_dining',
  postcode text not null,
  estimated_spend numeric(10, 2),
  source text not null default 'website', -- google_search, referral, cold_outreach, quote_form
  status lead_status not null default 'new_lead',
  assigned_sales_rep text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- CUSTOMER FAVOURITES ----------------------------------------------
create table customer_favourites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(organization_id, product_id)
);

-- ---------- TIERED PRICING -----------------------------------------------------
-- Per-organization overrides on top of base_price, powering the "dynamic
-- tiered catalog" — either a percentage discount or a hard override price.

create table tiered_pricing (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  discount_percent numeric(5, 2),
  override_price numeric(10, 2),
  created_at timestamptz not null default now(),
  unique (organization_id, product_id)
);

-- ---------- ORDERS -----------------------------------------------------------

create table orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  placed_by uuid references profiles(id),
  depot_id uuid references depots(id),
  status order_status not null default 'draft',
  delivery_slot timestamptz,
  is_standing_order boolean not null default false,
  recurrence_rule text, -- e.g. RFC 5545 RRULE for standing orders
  notes text,
  subtotal numeric(10, 2) not null default 0,
  vat_total numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  qty integer not null check (qty > 0),
  unit_price numeric(10, 2) not null -- snapshot of tiered price at order time
);

-- ---------- TRADE CREDIT -----------------------------------------------------

create table trade_credit_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references organizations(id) on delete cascade,
  credit_limit numeric(10, 2) not null default 0,
  credit_used numeric(10, 2) not null default 0,
  credit_tier credit_tier not null default 'standard',
  statement_day integer not null default 1 check (statement_day between 1 and 28),
  updated_at timestamptz not null default now()
);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  order_id uuid references orders(id),
  invoice_number text unique not null,
  vat_amount numeric(10, 2) not null default 0,
  total_amount numeric(10, 2) not null,
  pdf_url text,
  status invoice_status not null default 'open',
  issued_at timestamptz not null default now(),
  due_at timestamptz
);

-- ---------- INDEXES ----------------------------------------------------------

create index idx_profiles_org on profiles(organization_id);
create index idx_orders_org on orders(organization_id);
create index idx_order_items_order on order_items(order_id);
create index idx_tiered_pricing_org on tiered_pricing(organization_id);
create index idx_invoices_org on invoices(organization_id);
create index idx_applications_status on onboarding_applications(status);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
-- Model: a user belongs to exactly one organization via profiles.organization_id.
-- Admins within an org can manage that org's data; purchasers/finance have
-- narrower access. The service role (used by Server Actions / route handlers
-- for onboarding provisioning) bypasses RLS entirely, as usual with Supabase.

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table tiered_pricing enable row level security;
alter table trade_credit_accounts enable row level security;
alter table invoices enable row level security;
alter table onboarding_applications enable row level security;
-- depots and products are public read (catalog browsing before login is fine);
-- writes are admin-only via service role, so RLS stays off for simplicity,
-- or enable with a public-read policy if you prefer defense in depth:
alter table depots enable row level security;
alter table products enable row level security;

create policy "depots are publicly readable"
  on depots for select using (true);

create policy "active products are publicly readable"
  on products for select using (active = true);

create policy "users can view their own organization"
  on organizations for select
  using (id in (select organization_id from profiles where id = auth.uid()));

create policy "org admins can update their organization"
  on organizations for update
  using (
    id in (
      select organization_id from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "users can view profiles in their own organization"
  on profiles for select
  using (
    organization_id in (
      select organization_id from profiles where id = auth.uid()
    )
  );

create policy "users can update their own profile"
  on profiles for update
  using (id = auth.uid());

create policy "org admins can manage profiles in their organization"
  on profiles for all
  using (
    organization_id in (
      select organization_id from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "users can view their organization's orders"
  on orders for select
  using (
    organization_id in (select organization_id from profiles where id = auth.uid())
  );

create policy "purchasers and admins can create orders for their organization"
  on orders for insert
  with check (
    organization_id in (
      select organization_id from profiles
      where id = auth.uid() and role in ('admin', 'purchaser')
    )
  );

create policy "users can view order items for their organization's orders"
  on order_items for select
  using (
    order_id in (
      select id from orders where organization_id in (
        select organization_id from profiles where id = auth.uid()
      )
    )
  );

create policy "users can view their organization's tiered pricing"
  on tiered_pricing for select
  using (
    organization_id in (select organization_id from profiles where id = auth.uid())
  );

create policy "users can view their organization's trade credit account"
  on trade_credit_accounts for select
  using (
    organization_id in (select organization_id from profiles where id = auth.uid())
  );

create policy "finance and admin roles can view invoices"
  on invoices for select
  using (
    organization_id in (
      select organization_id from profiles
      where id = auth.uid() and role in ('admin', 'finance')
    )
  );

-- Onboarding applications are written by the public (service role, from the
-- Server Action) and are not directly readable by anonymous users. Admins
-- of the resulting organization may view their own application once linked.
create policy "org admins can view their linked application"
  on onboarding_applications for select
  using (
    organization_id in (
      select organization_id from profiles
      where id = auth.uid() and role = 'admin'
    )
  );
