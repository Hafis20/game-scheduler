do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'tournaments_created_by_fkey'
      and conrelid = 'public.tournaments'::regclass
  ) then
    alter table public.tournaments
      add constraint tournaments_created_by_fkey
      foreign key (created_by)
      references public.profiles(id)
      on delete cascade;
  end if;
end
$$;
