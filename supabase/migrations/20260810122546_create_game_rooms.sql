create table public.game_rooms (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  game_name text not null,
  max_players int not null default 2,
  starts_at timestamptz,
  host_user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.game_rooms enable row level security;