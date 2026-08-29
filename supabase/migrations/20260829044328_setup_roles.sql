create type public.user_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'user'::public.user_role
);

alter table public.user_roles enable row level security;

grant select on public.user_roles to authenticated;

create policy "Users can read their own role"
on public.user_roles
for select
to authenticated
using (auth.uid() = id);

-- Keep the existing function and make it create both records
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    avatar_url
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );

  insert into public.user_roles (id, role)
  values (new.id, 'user'::public.user_role);

  return new;
end;
$$;

-- Add roles for users who already exist
insert into public.user_roles (id, role)
select id, 'user'::public.user_role
from auth.users
on conflict (id) do nothing;