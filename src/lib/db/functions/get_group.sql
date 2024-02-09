-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function get_group (group_id bigint) returns table (
  groupname text,
  group_bio text,
  group_coverImg text,
  group_profileImg text
) as $$
BEGIN
  RETURN QUERY
  SELECT
    name as groupname,
    description as group_bio,
    "coverImg" as group_coverImg,
    "profileImg" as group_profileImg
  FROM
    "Group"
  WHERE id = group_id;
END;
$$ language plpgsql;