-- SalesCockpit SaaS — Database Schema (Supabase/PostgreSQL)

-- 1. Tenants (Companies)
create table tenants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  iban text,
  bank_name text,
  address text,
  phone text,
  email text,
  google_cal_id text,
  outlook_cal_id text,
  config jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- 2. Profiles (Users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  tenant_id uuid references tenants(id),
  full_name text,
  role text default 'agent', -- admin, agent
  created_at timestamp with time zone default now()
);

-- 3. Leads (Opportunities)
create table leads (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id) not null,
  data jsonb not null, -- Stores the Google Sheets style columns (Name, Email, Phone, etc.)
  status text default 'discovery',
  assigned_to uuid references profiles(id),
  last_contacted_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 4. Tasks
create table tasks (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id) not null,
  lead_id uuid references leads(id) on delete cascade,
  title text not null,
  description text,
  due_date timestamp with time zone,
  status text default 'todo', -- todo, done
  created_at timestamp with time zone default now()
);

-- 5. Row Level Security (RLS)
alter table tenants enable row level security;
alter table profiles enable row level security;
alter table leads enable row level security;
alter table tasks enable row level security;

-- Policies: Only allow users to see data from their own tenant
create policy "Users can see their own tenant" on tenants
  for select using (id in (select tenant_id from profiles where id = auth.uid()));

create policy "Users can see their own profile" on profiles
  for select using (id = auth.uid());

create policy "Users can see their tenant's leads" on leads
  for all using (tenant_id in (select tenant_id from profiles where id = auth.uid()));

create policy "Users can see their tenant's tasks" on tasks
  for all using (tenant_id in (select tenant_id from profiles where id = auth.uid()));
