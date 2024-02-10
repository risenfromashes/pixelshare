-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function public.get_non_admin_groups (user_id text) returns table (
  group_id bigint,
  group_name text,
  profile_image_url text
) as $$ BEGIN RETURN QUERY SELECT gm."groupId", g.name, g."profileImg" FROM public."GroupMembers" gm JOIN public."Group" g ON gm."groupId" = g.id WHERE gm."memberId" = user_id AND gm."groupId" NOT IN (SELECT "groupId" FROM public."GroupAdmins" WHERE "adminId" = user_id); END; $$ language plpgsql;