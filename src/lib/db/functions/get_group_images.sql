-- drop function if exists get_groups(int8);

-- DROP FUNCTION get_groups(text);
create or replace function get_group_images(gid int8)
  returns table ("postId" int8, "imageId" int8, "caption" text, "createdAt" date, "createdBy" text, "url" text)
  language sql
as $$
  select "postId", "imageId", "caption", "createdAt", "createdBy", "url" from 
    "Post" p 
  join 
    "PostImages" pi
  on p.id = pi."postId"
  join 
    "Image" i
  on pi."imageId" = i.id;
$$;

-- select * from get_group_images(1);