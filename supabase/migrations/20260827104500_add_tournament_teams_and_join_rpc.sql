create table public.tournament_teams (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null
    references public.tournaments(id)
    on delete cascade,
  owner_id uuid not null
    references public.profiles(id)
    on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (tournament_id, owner_id)
);

alter table public.tournament_teams enable row level security;

create or replace function public.join_tournament(p_invite_token text)
returns table (
  team_id uuid,
  tournament_id uuid,
  team_name text,
  already_joined boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  selected_tournament_id uuid;
  selected_max_team_count integer;
  selected_team_id uuid;
  selected_team_name text;
begin
  if current_user_id is null then
    raise exception 'You must be signed in to join a tournament.';
  end if;

  select tournament.id, tournament.max_team_count
  into selected_tournament_id, selected_max_team_count
  from public.tournaments as tournament
  where tournament.invite_token = upper(trim(p_invite_token))
    and upper(trim(p_invite_token)) ~ '^[A-Z2-9]{10}$'
  for update;

  if selected_tournament_id is null then
    raise exception 'This invitation token is invalid.';
  end if;

  select team.id, team.name
  into selected_team_id, selected_team_name
  from public.tournament_teams as team
  where team.tournament_id = selected_tournament_id
    and team.owner_id = current_user_id;

  if selected_team_id is not null then
    return query
      select
        selected_team_id,
        selected_tournament_id,
        selected_team_name,
        true;
    return;
  end if;

  if (
    select count(*)
    from public.tournament_teams as team
    where team.tournament_id = selected_tournament_id
  ) >= selected_max_team_count then
    raise exception 'This tournament is full.';
  end if;

  select profile.full_name
  into selected_team_name
  from public.profiles as profile
  where profile.id = current_user_id;

  selected_team_name := coalesce(
    nullif(trim(selected_team_name), ''),
    'Team ' || upper(substring(current_user_id::text from 1 for 8))
  );

  insert into public.tournament_teams (
    tournament_id,
    owner_id,
    name
  )
  values (
    selected_tournament_id,
    current_user_id,
    selected_team_name
  )
  returning id into selected_team_id;

  return query
    select
      selected_team_id,
      selected_tournament_id,
      selected_team_name,
      false;
end;
$$;

revoke all
  on function public.join_tournament(text)
  from public;

grant execute
  on function public.join_tournament(text)
  to authenticated;
