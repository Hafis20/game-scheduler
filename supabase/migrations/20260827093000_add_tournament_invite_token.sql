alter table public.tournaments
  add column invite_token uuid not null default gen_random_uuid();

alter table public.tournaments
  add constraint tournaments_invite_token_key unique (invite_token);

-- The earlier broad policy would expose every tournament's invite token.
drop policy if exists "Authenticated users can view tournaments"
  on public.tournaments;
