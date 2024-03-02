-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- drop function if exists get_notifications (text);

CREATE OR REPLACE FUNCTION get_notifications(user_id text) RETURNS TABLE (
  id bigint,
  "userId" text,
  username text,
  "profileImg" text,
  title text,
  content text,
  seen boolean,
  "createdAt" timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT n.id, n."userId", u.username, u."profileImg", n.title, n.content, n.seen, n."createdAt"
    FROM public."Notification" n
    INNER JOIN public."User" u ON n."userId" = u.id
    WHERE n."userId" = user_id
    ORDER BY n."createdAt" DESC; -- This will sort the notifications by createdAt in descending order
END;
$$ LANGUAGE plpgsql;


-- select * from get_user_notifications('0aacc737-0c42-48cd-a069-a8e151cfeb7e');