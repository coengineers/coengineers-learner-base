create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
grant select, insert, update on public.profiles to authenticated;
create policy own_profile_read on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy own_profile_insert on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy own_profile_update on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('private-files', 'private-files', false, 2097152, array['image/png','image/jpeg','image/webp','application/pdf','text/plain'])
on conflict (id) do nothing;
create policy own_file_read on storage.objects for select to authenticated
using (bucket_id = 'private-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy own_file_insert on storage.objects for insert to authenticated
with check (bucket_id = 'private-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy own_file_delete on storage.objects for delete to authenticated
using (bucket_id = 'private-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
