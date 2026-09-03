-- Profil-Tabelle, 1:1 zu auth.users. Standard-Startpunkt für Supabase-Projekte.
-- Anwenden: über das Supabase-Dashboard (SQL Editor) oder `supabase db push`.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Eigenes Profil lesen"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Eigenes Profil ändern"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Profil automatisch anlegen, wenn ein Nutzer registriert wird.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
