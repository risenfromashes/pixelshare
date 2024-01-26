-- DROP FUNCTION get_groups(text);
create or replace function get_groups(uid text)
  returns table ("groupId" int8, "groupName" text, "groupImg" text)
  language sql
as $$
  select g.id, g.name, g."profileImg"
  from "Group" g
  join "GroupMembers" m
  on g.id = m."groupId"
  where m."memberId" = uid;
$$;
