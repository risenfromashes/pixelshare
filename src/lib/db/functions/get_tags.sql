drop function if exists get_tags (bigint);

create
or replace function get_tags (gid int8) returns table (
  "id" int8,
  "createdBy" text,
  "description" text,
  "tagName" text,
  "tagImage" text,
  "createdAt" timestamptz,
  "generalName" text
) language sql as $$
  SELECT t."id" AS "tagId", t."createdBy",  t."description", t."tagName", t."tagImage",t."createdAt", t."generalName" FROM 
    "Tag" t 
  JOIN 
    "GroupTags" gt
  ON t.id = gt."tagId"
  WHERE gt."groupId" = gid;
$$;