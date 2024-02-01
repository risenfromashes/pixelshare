-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- drop function if exists get_notifications (text);

create
or replace function get_notifications (user_id text) returns table (
  id bigint,
  "userId" text,
  username text,
  "profileImg" text,
  title text,
  content text,
  seen boolean,
  "createdAt" timestamptz
) as $$
BEGIN
    RETURN QUERY
    SELECT n.id, n."userId", u.username, u."profileImg",  n.title, n.content, n.seen, n."createdAt"
    FROM public."Notification" n
    INNER JOIN public."User" u ON n."userId" = u.id
    WHERE n."userId" = user_id;
END;
$$ language plpgsql;

-- select * from get_user_notifications('0aacc737-0c42-48cd-a069-a8e151cfeb7e');