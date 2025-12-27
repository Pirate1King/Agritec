-- Agritec core schema (Supabase / Postgres)
create extension if not exists "pgcrypto";

create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  hero_url text,
  pdf_url text,
  problem text,
  solution text,
  benefits jsonb,
  is_published boolean not null default true
);
create index if not exists idx_solutions_published on public.solutions (is_published);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  slug text not null unique,
  name text not null,
  category text,
  excerpt text,
  description text,
  usage text,
  unit text,
  price numeric,
  is_published boolean not null default true
);
create index if not exists idx_products_published on public.products (is_published);
create index if not exists idx_products_category on public.products (category);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  is_primary boolean not null default false
);
create index if not exists idx_product_images_product on public.product_images(product_id);
create index if not exists idx_product_images_primary on public.product_images(product_id, is_primary);

create table if not exists public.solution_products (
  solution_id uuid not null references public.solutions(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  primary key (solution_id, product_id)
);
create index if not exists idx_solution_products_product on public.solution_products(product_id);

create table if not exists public.solution_combos (
  id uuid primary key default gen_random_uuid(),
  solution_id uuid not null references public.solutions(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  price numeric,
  is_active boolean not null default true
);
create index if not exists idx_solution_combos_solution on public.solution_combos(solution_id);
create index if not exists idx_solution_combos_active on public.solution_combos(is_active);

create table if not exists public.combo_items (
  combo_id uuid not null references public.solution_combos(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null default 1 check (quantity > 0),
  primary key (combo_id, product_id)
);
create index if not exists idx_combo_items_product on public.combo_items(product_id);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  name text not null,
  phone text not null,
  address text not null,
  note text,
  payment_method text not null check (payment_method in ('cod', 'bank_transfer')),
  status text not null default 'pending' check (status in ('pending','confirmed','shipped','completed','cancelled'))
);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_phone on public.orders(phone);

create table if not exists public.order_items (
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null default 1 check (quantity > 0),
  price numeric,
  primary key (order_id, product_id)
);
create index if not exists idx_order_items_product on public.order_items(product_id);

-- Storage buckets (configure via Supabase dashboard)
-- public bucket: solutions/*, products/*

-- Basic RLS placeholders (tighten according to your auth model)
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.solutions enable row level security;
alter table public.solution_products enable row level security;
alter table public.solution_combos enable row level security;
alter table public.combo_items enable row level security;

-- Example policy: allow service role full access (adjust with your admin role)
do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'service_role_full_access') then
    create policy service_role_full_access on public.orders for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_products on public.products for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_solutions on public.solutions for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_combos on public.solution_combos for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_combo_items on public.combo_items for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_solution_products on public.solution_products for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_product_images on public.product_images for all using (auth.role() = 'service_role') with check (true);
    create policy service_role_full_access_order_items on public.order_items for all using (auth.role() = 'service_role') with check (true);
  end if;
end$$;
