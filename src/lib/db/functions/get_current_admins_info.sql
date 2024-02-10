-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function public.get_group_admins_info (group_id bigint) returns table (username text, profile_img text) as $$ BEGIN RETURN QUERY SELECT u.username, u."profileImg" FROM public."User" u JOIN public."GroupAdmins" ga ON u.id = ga."adminId" WHERE ga."groupId" = group_id; END; $$ language plpgsql;