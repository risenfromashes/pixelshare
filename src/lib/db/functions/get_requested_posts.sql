-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function get_requested_posts (group_id bigint) returns table (
  id bigint,
  caption text,
  location text,
  createdBy text,
  approvedBy text,
  createdAt timestamp with time zone,
  title text,
  groupId bigint,
  status text,
  postId bigint,
  imageUrls text[],
  tagNames text[]
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
    p.status,
    p.id as "postId",
    array_agg(DISTINCT i.url) AS "imageUrls",
    array_agg(DISTINCT t."tagName") AS "tagNames"
  FROM
    public."Post" p
    JOIN public."PostImages" pi ON p.id = pi."postId"
    JOIN public."Image" i ON pi."imageId" = i.id
    JOIN public."PostTags" pt ON p.id = pt."postId"
    JOIN public."Tag" t ON pt."TagId" = t.id
  WHERE
    p.status = 'requested' AND p."groupId" = group_id
  GROUP BY
    p.id, p.caption, p.location, p."createdBy", p."approvedBy", p."createdAt", p.title, p."groupId", p.status;
END;
$$ language plpgsql;


// 
-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
DROP FUNCTION get_requested_posts(bigint);
create
or replace function get_requested_posts (group_id bigint) returns table (
  id bigint,
  caption text,
  location text,
  createdBy text,
  approvedBy text,
  createdAt timestamp with time zone,
  title text,
  groupId bigint,
  status text,
  postId bigint,
  imageUrls text[],
  tagNames text[],
  imageLen bigint,
  tagLen bigint
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
    p.status,
    p.id as "postId",
    array_agg(DISTINCT i.url) AS "imageUrls",
    array_agg(DISTINCT t."tagName") AS "tagNames",
    count(DISTINCT i.url) AS "imageLen",
    count(DISTINCT t."tagName") AS "tagLen"
  FROM
    public."Post" p
    JOIN public."PostImages" pi ON p.id = pi."postId"
    JOIN public."Image" i ON pi."imageId" = i.id
    JOIN public."PostTags" pt ON p.id = pt."postId"
    JOIN public."Tag" t ON pt."TagId" = t.id
  WHERE
    p.status = 'requested' AND p."groupId" = group_id
  GROUP BY
    p.id, p.caption, p.location, p."createdBy", p."approvedBy", p."createdAt", p.title, p."groupId", p.status;
END;
$$ language plpgsql;