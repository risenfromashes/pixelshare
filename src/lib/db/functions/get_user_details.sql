-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function public.get_user_details (user_id text) returns table (
  id text,
  username text,
  bio text,
  location text,
  joiningDate date,
  phoneNumber text,
  email text,
  profileImg text
) as $$
BEGIN
RETURN QUERY
select
  u."id",
  u."username",
  u."bio",
  u."location",
  u."joiningDate",
  u."phoneNumber",
  u."email",
  u."profileImg"
from
  "User" u
where
  u.id = user_id;
END;
$$ language plpgsql;