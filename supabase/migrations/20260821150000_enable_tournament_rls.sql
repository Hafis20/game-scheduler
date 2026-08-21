alter table public.tournaments enable row level security;

create index tournaments_created_by_idx
  on public.tournaments (created_by);

grant select, insert
  on table public.tournaments
  to authenticated;

create policy "Users can view their own tournaments"
  on public.tournaments
  for select
  to authenticated
  using ((select auth.uid()) = created_by);

create policy "Users can create their own tournaments"
  on public.tournaments
  for insert
  to authenticated
  with check ((select auth.uid()) = created_by);
