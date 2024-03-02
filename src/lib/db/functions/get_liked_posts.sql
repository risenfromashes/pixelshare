-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
-- DROP FUNCTION IF EXISTS get_liked_posts(bigint, text);

create
or replace function public.get_liked_posts (group_id bigint, user_id text) returns table (
  id bigint,
  caption text,
  location text,
  createdBy text,
  approvedBy text,
  createdAt timestamp with time zone,
  title text,
  groupId bigint,
  status text,
  num_reacts bigint,
  is_liked boolean,
  image_ids bigint[],
  image_urls text[],
  poster_profile_img text
) as $$
BEGIN
RETURN QUERY
SELECT
  p."id",
  p."caption",
  p."location",
  u.username AS createdBy,
  p."approvedBy",
  p."createdAt",
  p."title",
  p."groupId",
  p."status",
  (SELECT COUNT(*) FROM "Reacts" rr WHERE rr."postId" = p."id") AS num_reacts,
  BOOL_OR(r."reactedBy" = user_id) AS is_liked,
  ARRAY_AGG(i.id) FILTER (WHERE i.id IS NOT NULL) AS image_ids,
  ARRAY_AGG(i.url) FILTER (WHERE i.url IS NOT NULL) AS image_urls,
  u."profileImg" AS poster_profile_img
FROM 
  "Post" p
  LEFT JOIN "PostImages" pi ON p."id" = pi."postId"
  LEFT JOIN "Image" i ON pi."imageId" = i.id
  LEFT JOIN "Reacts" r ON p."id" = r."postId"
  JOIN "User" u ON p."createdBy" = u.id
WHERE
  p."groupId" = group_id
GROUP BY
  p."id", u.username, u."profileImg";
END;
$$ language plpgsql;

-- select * from get_liked_posts(1, '02849fe6-469d-4192-828e-b3a5a55b3a28');