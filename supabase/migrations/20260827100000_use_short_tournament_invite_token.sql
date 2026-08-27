alter table public.tournaments
  alter column invite_token drop default;

alter table public.tournaments
  alter column invite_token type text
  using upper(substring(replace(invite_token::text, '-', '') from 1 for 10));

alter table public.tournaments
  alter column invite_token set default
  upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 10));
