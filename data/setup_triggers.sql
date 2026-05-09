-- 1. Create a function to handle new user signups
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

  return new;
end;
$$;

-- 2. Create the trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- BACKFILL SCRIPT FOR EXISTING USERS (e.g. burak.kahraman02@gmail.com)
-- Run this if you already have users who don't have a tenant assigned!
-- ==========================================
do $$
declare
  u record;
  new_tenant_id uuid;
begin
  for u in select id, raw_user_meta_data from auth.users where id not in (select id from public.profiles where tenant_id is not null) loop
    -- Create tenant
    insert into public.tenants (name, slug)
    values ('Legacy Venue', 'legacy-' || substr(md5(random()::text), 1, 6))
    returning id into new_tenant_id;

    -- Upsert profile
    insert into public.profiles (id, tenant_id, role, full_name)
    values (u.id, new_tenant_id, 'admin', u.raw_user_meta_data->>'full_name')
    on conflict (id) do update set tenant_id = excluded.tenant_id;
  end loop;
end;
$$;
