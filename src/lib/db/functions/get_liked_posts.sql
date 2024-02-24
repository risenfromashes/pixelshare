DROP FUNCTION IF EXISTS get_liked_posts(bigint, text);

CREATE OR REPLACE FUNCTION public.get_liked_posts (
  group_id bigint,
  user_id text
) RETURNS TABLE (
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
  image_urls text[]
) AS $$
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
  COALESCE(COUNT(r."reactId"), 0) AS num_reacts, -- Use COALESCE to ensure 0 is returned where there are no reacts
  BOOL_OR(r."reactedBy" = user_id) AS is_liked, -- FALSE when there are no reacts by the user
  ARRAY_AGG(i.url) FILTER (WHERE i.url IS NOT NULL) AS image_urls -- Filter out NULLs from the aggregation
FROM
  "Post" p
  LEFT JOIN "Reacts" r ON p."id" = r."postId" -- Changed to LEFT JOIN to include posts without reacts
  LEFT JOIN "PostImages" pi ON p."id" = pi."postId"
  LEFT JOIN "Image" i ON pi."imageId" = i.id
  JOIN "User" u ON p."createdBy" = u.id
WHERE
  p."groupId" = group_id
GROUP BY
  p."id", u.username;
END;
$$ LANGUAGE plpgsql;
