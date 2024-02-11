

-- drop function get_group_members (bigint);

create
or replace function get_group_members (gid int8) returns table (
  "groupId" int8,
  "userId" text,
  "username" text,
  "joinedAt" timestamptz,
  "status" text,
  "profileImg" text
) language sql as $$
  SELECT 
    g.id AS "groupId",
    u.id AS "userId",
    u.username AS "username",
    gm."joiningDate" AS "joinedAt",
    gm.status AS "status",
    u."profileImg" AS "profileImg"
  FROM 
    "Group" g
  JOIN 
    "GroupMembers" gm ON g.id = gm."groupId"
  JOIN 
    "User" u ON gm."memberId" = u.id
  WHERE g.id = gid;
$$;

-- select
--   *
-- from
--   get_group_members (1);