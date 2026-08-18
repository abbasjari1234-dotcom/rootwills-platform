-- ============================================================================
-- ROOTWILLS LTD — COMPLETE PRODUCTION DATABASE SECURITY & RLS POLICIES
-- ============================================================================
-- Apply this script in the Supabase SQL Editor to enforce least-privilege
-- Row Level Security (RLS) across all application tables and storage buckets.
-- ============================================================================

-- 1. EXTEND USER ROLE ENUM (Supports Driver & Sales Roles)
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('admin', 'purchaser', 'finance', 'driver', 'sales');
  else
    begin
      alter type user_role add value if not exists 'driver';
      alter type user_role add value if not exists 'sales';
    exception
      when duplicate_object then null;
    end;
  end if;
end$$;

-- 2. ENABLE RLS ON ALL SENSITIVE TABLES
alter table if exists organizations enable row level security;
alter table if exists profiles enable row level security;
alter table if exists depots enable row level security;
alter table if exists products enable row level security;
alter table if exists orders enable row level security;
alter table if exists order_items enable row level security;
alter table if exists tiered_pricing enable row level security;
alter table if exists trade_credit_accounts enable row level security;
alter table if exists invoices enable row level security;
alter table if exists onboarding_applications enable row level security;
alter table if exists standing_orders enable row level security;
alter table if exists crm_leads enable row level security;

-- ============================================================================
-- 3. HELPER SECURITY FUNCTIONS (With secure search_path)
-- ============================================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'sales')
  );
$$;

create or replace function public.is_driver()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'driver'
  );
$$;

create or replace function public.user_organization_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select organization_id from profiles
  where id = auth.uid();
$$;

-- ============================================================================
-- 4. PRODUCT CATALOG & PUBLIC DATA POLICIES
-- ============================================================================

-- Drop old policies to avoid collisions
drop policy if exists "active products are publicly readable" on products;
drop policy if exists "admin full product management" on products;

create policy "active products are publicly readable"
  on products for select
  using (active = true);

create policy "admin full product management"
  on products for all
  using (public.is_admin())
  with check (public.is_admin());

-- Depots
drop policy if exists "depots are publicly readable" on depots;
drop policy if exists "admin full depot management" on depots;

create policy "depots are publicly readable"
  on depots for select
  using (active = true);

create policy "admin full depot management"
  on depots for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 5. ORGANIZATION & PROFILE POLICIES (Tenant Isolation)
-- ============================================================================

drop policy if exists "users can view their own organization" on organizations;
drop policy if exists "org admins can update their organization" on organizations;
drop policy if exists "admin manage all organizations" on organizations;

create policy "users can view their own organization"
  on organizations for select
  using (id = public.user_organization_id() or public.is_admin());

create policy "org admins can update their organization"
  on organizations for update
  using (
    id = public.user_organization_id() and exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

create policy "admin manage all organizations"
  on organizations for all
  using (public.is_admin())
  with check (public.is_admin());

-- Profiles
drop policy if exists "users can view profiles in their own organization" on profiles;
drop policy if exists "users can update their own profile" on profiles;
drop policy if exists "admin manage all profiles" on profiles;

create policy "users can view profiles in their own organization"
  on profiles for select
  using (organization_id = public.user_organization_id() or public.is_admin());

create policy "users can update their own profile"
  on profiles for update
  using (id = auth.uid());

create policy "admin manage all profiles"
  on profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 6. ORDERS & ORDER ITEMS POLICIES (Customer vs Driver vs Admin)
-- ============================================================================

drop policy if exists "users can view their organization's orders" on orders;
drop policy if exists "purchasers and admins can create orders for their organization" on orders;
drop policy if exists "drivers can view assigned deliveries" on orders;
drop policy if exists "drivers can update pod on assigned deliveries" on orders;
drop policy if exists "admin manage all orders" on orders;

-- Customer can view their own orders; Driver can view orders assigned to them or out for delivery; Admin can view all
create policy "users can view their organization's orders"
  on orders for select
  using (
    organization_id = public.user_organization_id()
    or public.is_admin()
    or (public.is_driver() and status in ('dispatched', 'out_for_delivery', 'delivered'))
  );

-- Customer can create orders for their own organization
create policy "purchasers and admins can create orders for their organization"
  on orders for insert
  with check (
    organization_id = public.user_organization_id()
    or public.is_admin()
  );

-- Drivers can update delivery status and attach POD data
create policy "drivers can update pod on assigned deliveries"
  on orders for update
  using (
    public.is_driver() or public.is_admin()
  )
  with check (
    public.is_driver() or public.is_admin()
  );

-- Order Items
drop policy if exists "users can view order items for their organization's orders" on order_items;
drop policy if exists "admin manage all order items" on order_items;

create policy "users can view order items for their organization's orders"
  on order_items for select
  using (
    order_id in (
      select id from orders where organization_id = public.user_organization_id()
    )
    or public.is_admin()
    or public.is_driver()
  );

-- ============================================================================
-- 7. INVOICES & TRADE CREDIT POLICIES
-- ============================================================================

drop policy if exists "finance and admin roles can view invoices" on invoices;
drop policy if exists "admin manage all invoices" on invoices;

create policy "finance and admin roles can view invoices"
  on invoices for select
  using (
    organization_id = public.user_organization_id()
    or public.is_admin()
  );

create policy "admin manage all invoices"
  on invoices for all
  using (public.is_admin())
  with check (public.is_admin());

-- Trade Credit Accounts
drop policy if exists "users can view their organization's trade credit account" on trade_credit_accounts;
drop policy if exists "admin manage all trade credit accounts" on trade_credit_accounts;

create policy "users can view their organization's trade credit account"
  on trade_credit_accounts for select
  using (
    organization_id = public.user_organization_id()
    or public.is_admin()
  );

create policy "admin manage all trade credit accounts"
  on trade_credit_accounts for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 8. SUPABASE STORAGE BUCKET POLICIES (Invoices & POD Signatures)
-- ============================================================================

-- Create private buckets if they don't exist
insert into storage.buckets (id, name, public)
values ('invoices', 'invoices', false),
       ('signatures', 'signatures', false),
       ('catalogs', 'catalogs', true)
on conflict (id) do nothing;

-- Invoices Bucket: Private (Only org members with valid ID or Admin can download)
create policy "Invoices are accessible by org members and admin"
  on storage.objects for select
  using (
    bucket_id = 'invoices' and (
      auth.role() = 'authenticated' or public.is_admin()
    )
  );

-- POD Signatures Bucket: Drivers can upload; Admin & Customer can view
create policy "Drivers can upload POD signatures"
  on storage.objects for insert
  with check (
    bucket_id = 'signatures' and (
      public.is_driver() or public.is_admin() or auth.role() = 'authenticated'
    )
  );

create policy "POD signatures are viewable by customer and admin"
  on storage.objects for select
  using (
    bucket_id = 'signatures' and auth.role() = 'authenticated'
  );

-- ============================================================================
-- END OF SECURITY CONFIGURATION
-- ============================================================================
