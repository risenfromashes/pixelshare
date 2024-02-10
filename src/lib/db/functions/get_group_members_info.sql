-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function public.get_group_members_info (group_id bigint) returns table (username text, profile_img text) as $$
BEGIN
    RETURN QUERY
    SELECT u.username, u."profileImg"
    FROM public."User" u
    JOIN public."GroupMembers" gm ON u.id = gm."memberId"
    WHERE gm."groupId" = group_id;
END;
$$ language plpgsql;


// now this one

create
or replace function public.get_group_members_info (group_id bigint) returns table (username text, profile_img text) as $$ BEGIN RETURN QUERY SELECT u.username, u."profileImg" FROM public."User" u JOIN public."GroupMembers" gm ON u.id = gm."memberId" WHERE gm."groupId" = group_id AND gm.status = 'joined'; END; $$ language plpgsql;