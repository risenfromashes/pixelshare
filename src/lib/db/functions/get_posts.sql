-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- drop function if exists get_posts (text);

create
or replace function get_posts (uid text) returns table (
  id bigint,
  caption text,
  location text,
  "createdBy" text,
  "approvedBy" text,
  "createdAt" timestamp with time zone,
  title text,
  "groupId" bigint,
  status text
) as $$
BEGIN
RETURN QUERY
SELECT
  p.id,
  p.caption,
  p.location,
  p."createdBy",
  p."approvedBy",
  p."createdAt",
  p.title,
  p."groupId",
  p.status
FROM
  public."Post" p
WHERE
  p."groupId" IN (
    SELECT
      gm."groupId"
    FROM
      public."GroupMembers" gm
    WHERE
      "memberId" = uid
  )
  OR p."createdBy" = uid
  AND p.status = 'approved'
ORDER BY
  "createdAt" DESC;
END;
$$ language plpgsql;

-- select * from get_posts('02849fe6-469d-4192-828e-b3a5a55b3a28');