-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- drop function if exists get_images(text);

create
or replace function get_images (uid text) returns table (
  id bigint,
  url text,
  date timestamp with time zone
) as $$
BEGIN
RETURN QUERY
SELECT
  i.id,
  i.url,
  p."createdAt"
FROM
  public."Image" i
JOIN
  public."PostImages" pi ON i.id = pi."imageId"
JOIN
  public."Post" p ON pi."postId" = p.id
WHERE
  p."groupId" IN (
    SELECT
      gm."groupId"
    FROM
      public."GroupMembers" gm
    WHERE
      gm."memberId" = uid
  )
  OR p."createdBy" = uid
ORDER BY
  p."createdAt" DESC;
END;
$$ language plpgsql;


-- select * from get_images('02849fe6-469d-4192-828e-b3a5a55b3a28');