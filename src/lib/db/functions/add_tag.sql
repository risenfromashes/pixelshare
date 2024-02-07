-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- DROP FUNCTION add_group(text,text,text,timestamptz,text,text);

create
or replace function add_tag (
  "tagName" text,
  "createdBy" text,
  "description" text,
  "createdAt" timestamptz,
  "tagImage" text,
  "groupId" bigint
) returns VOID as $$
DECLARE
    new_tag_id bigint;
BEGIN
   -- insert into tag table
    INSERT INTO "Tag" ("tagName", "createdBy", "description", "createdAt", "tagImage")
    VALUES ("tagName", "createdBy", "description", "createdAt", "tagImage")
    RETURNING id INTO new_tag_id;

    -- add tag, groupid pair into GroupTags table
    INSERT INTO "GroupTags" ("groupId", "tagId")
    VALUES ("groupId", new_tag_id);

END;
$$ language plpgsql;