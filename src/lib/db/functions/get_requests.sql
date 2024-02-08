-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing


create
or replace function get_requests (gid int8) returns table (
  "username" text,
  "profileImg" text
) language sql as $$
  SELECT u."username", u."profileImg" FROM 
    "User" u 
  JOIN 
    "GroupMembers" gm
  ON u."id" = gm."memberId"
  WHERE gm."groupId" = gid
  AND gm."status"="requested";
$$;