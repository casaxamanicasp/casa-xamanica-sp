-- Casa Xamânica SP — Schema inicial
-- Habilitar extensão UUID
create extension if not exists "pgcrypto";

-- ============================================================
-- EVENTOS / CERIMÔNIAS
-- ============================================================
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  date timestamptz not null,
  location_name text not null default 'Casa Árvore da Vida',
  address text not null default 'Estrada Turística Morro do Saboó, 6201, São Roque, SP',
  maps_link text,
  spots_total integer not null default 30,
  spots_available integer not null default 30,
  cover_image text,
  medicines text[] default '{}',
  schedule jsonb default '[]',
  pricing_tiers jsonb default '[]',
  transfer_available boolean default false,
  transfer_price_cents integer default 0,
  transfer_location text,
  cancellation_policy text default 'Sem reembolso após o pagamento. O valor ficará de crédito para uma próxima cerimônia.',
  orientations text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  cover_image text,
  author text default 'Casa Xamânica SP',
  published_at timestamptz,
  is_published boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- PRODUTOS
-- ============================================================
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price_cents integer not null default 0,
  stock integer not null default 0,
  images text[] default '{}',
  category text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- PEDIDOS DA LOJA
-- ============================================================
create table orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  buyer_address text,
  quantity integer not null default 1,
  amount_cents integer not null,
  status text not null default 'pending',
  payment_id text,
  payment_method text,
  created_at timestamptz default now()
);

-- ============================================================
-- INSCRIÇÕES EM CERIMÔNIAS
-- ============================================================
create table registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  pricing_tier_name text,
  include_transfer boolean default false,
  status text not null default 'pending',
  payment_id text,
  payment_method text,
  amount_cents integer not null default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- FICHAS DE ANAMNESE
-- ============================================================
create table anamnesis (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid references registrations(id) on delete cascade unique,

  -- Dados pessoais
  full_name text not null,
  email text not null,
  birth_date date not null,
  phone text not null,
  address text not null,

  -- Saúde e histórico
  previous_ayahuasca text not null,
  health_treatment text not null,
  current_medications text not null,
  allergies text not null,

  -- Condições (checkboxes)
  health_conditions text[] not null default '{}',

  -- Outros problemas de saúde
  other_health_issues text not null,

  -- Intenção
  ceremony_expectation text not null,

  -- Termos aceitos
  terms_accepted boolean not null default false,

  created_at timestamptz default now()
);

-- ============================================================
-- APOIADORES / PATROCINADORES
-- ============================================================
create table supporters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  logo_url text,
  website text,
  category text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================
alter table events enable row level security;
alter table blog_posts enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table registrations enable row level security;
alter table anamnesis enable row level security;
alter table supporters enable row level security;

-- Leitura pública para conteúdo público
create policy "events_public_read" on events for select using (is_active = true);
create policy "blog_public_read" on blog_posts for select using (is_published = true);
create policy "products_public_read" on products for select using (is_active = true);
create policy "supporters_public_read" on supporters for select using (is_active = true);

-- Escrita pública para inscrições e pedidos (via server action)
create policy "registrations_insert" on registrations for insert with check (true);
create policy "anamnesis_insert" on anamnesis for insert with check (true);
create policy "orders_insert" on orders for insert with check (true);

-- Admin via service role key ignora RLS automaticamente

-- ============================================================
-- FUNÇÃO: decrementar vagas após pagamento aprovado
-- ============================================================
create or replace function decrement_spots(event_id uuid)
returns void language plpgsql security definer as $$
begin
  update events
  set spots_available = greatest(spots_available - 1, 0)
  where id = event_id;
end;
$$;
