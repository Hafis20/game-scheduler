create table public.tournaments (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  game text not null,

  max_player_count integer not null,

  format text not null,

  status text not null default 'DRAFT',

  start_date timestamptz,

  description text,

  is_private boolean not null default false,

  created_by uuid not null,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);
