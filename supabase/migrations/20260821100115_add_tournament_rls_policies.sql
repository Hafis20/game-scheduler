-- Give the authenticated Supabase role database privileges
grant select, insert, update, delete
on table public.tournaments
to authenticated;

-- Enable Row Level Security
alter table public.tournaments
enable row level security;

-- Everyone logged in can view tournaments
create policy "Authenticated users can view tournaments"
on public.tournaments
for select
to authenticated
using (true);

-- Everyone logged in can create a tournament,
-- but only for themselves
create policy "Authenticated users can create tournaments"
on public.tournaments
for insert
to authenticated
with check (
  created_by = auth.uid()
);

-- Only the creator can update
create policy "Creators can update their tournaments"
on public.tournaments
for update
to authenticated
using (created_by = auth.uid())
with check (created_by = auth.uid());

-- Only the creator can delete
create policy "Creators can delete their tournaments"
on public.tournaments
for delete
to authenticated
using (created_by = auth.uid());