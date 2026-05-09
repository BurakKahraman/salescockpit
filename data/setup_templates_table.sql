-- 1. Default Templates Table (Seed Data)
create table if not exists public.default_templates (
  id text primary key,
  type text not null, -- b2b, b2c
  lang text not null, -- de, en
  stage text not null, -- discovery, offer, etc.
  label text not null,
  ms text,
  subject text,
  body text,
  mirrors jsonb default '[]'::jsonb
);

-- 2. Tenant Templates Table
create table if not exists public.templates (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  tmpl_id text not null, -- The string ID like 'b2b_de_d1'
  type text not null,
  lang text not null,
  stage text not null,
  label text not null,
  ms text,
  subject text,
  body text,
  mirrors jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(tenant_id, tmpl_id)
);

-- 3. Enable RLS
alter table public.templates enable row level security;

drop policy if exists "Users can manage their tenant's templates" on public.templates;
create policy "Users can manage their tenant's templates" on public.templates
  for all using (tenant_id in (select tenant_id from profiles where id = auth.uid()));

-- 4. Update the Trigger Function to copy default templates
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  new_tenant_id uuid;
  venue_name text;
begin
  -- Get the venue name from user metadata, fallback to "My Venue"
  venue_name := coalesce(new.raw_user_meta_data->>'venue_name', 'My Venue');

  -- Create a new tenant
  insert into public.tenants (name, slug)
  values (venue_name, lower(regexp_replace(venue_name, '[^a-zA-Z0-9]', '', 'g')) || '-' || substr(md5(random()::text), 1, 6))
  returning id into new_tenant_id;

  -- Create the profile and link to the tenant
  insert into public.profiles (id, tenant_id, role, full_name)
  values (new.id, new_tenant_id, 'admin', new.raw_user_meta_data->>'full_name');

  -- Copy default templates to the new tenant
  insert into public.templates (tenant_id, tmpl_id, type, lang, stage, label, ms, subject, body, mirrors)
  select new_tenant_id, id, type, lang, stage, label, ms, subject, body, mirrors
  from public.default_templates;

  return new;
end;
$$;
