-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- drop function if exists get_group_posts(int8);

create
or replace function get_group_posts (gid int8) returns table (
  "postId" int8,
  "imageId" int8,
  "caption" text,
  "createdAt" timestamptz,
  "createdBy" text,
  "url" text,
  "userId" text,
  "username" text,
  "profileImg" text
) language sql as $$
  select p."id" as "postId", pi."imageId", p.caption, p."createdAt", p."createdBy", i.url, u.id as "userId", u.username, u."profileImg" from 
    "Post" p 
  join 
    "PostImages" pi
  on p.id = pi."postId"
  join 
    "Image" i
  on pi."imageId" = i.id
  join
    "User" u
  on p."createdBy" = u.id
  where p."groupId" = gid;
$$;