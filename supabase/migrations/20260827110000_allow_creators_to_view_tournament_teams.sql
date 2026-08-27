create index tournament_teams_tournament_id_idx
  on public.tournament_teams (tournament_id);

grant select
  on table public.tournament_teams
  to authenticated;

create policy "Tournament creators can view joined teams"
  on public.tournament_teams
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.tournaments as tournament
      where tournament.id = tournament_teams.tournament_id
        and tournament.created_by = (select auth.uid())
    )
  );
