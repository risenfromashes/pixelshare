
DROP FUNCTION add_group(text,text,text,timestamptz,text,text);

create
or replace function add_tag (
  "tagName" text,
  "createdBy" text,
  "description" text,
  "createdAt" timestamptz,
  "tagImage" text,
  "groupId" bigint,
  "short_desc" text
) returns VOID as $$
DECLARE
    new_tag_id bigint;
BEGIN
   -- insert into tag table
    INSERT INTO "Tag" ("tagName", "createdBy", "description", "createdAt", "tagImage","generalName")
    VALUES ("tagName", "createdBy", "description", "createdAt", "tagImage","short_desc")
    RETURNING id INTO new_tag_id;

    -- add tag, groupid pair into GroupTags table
    INSERT INTO "GroupTags" ("groupId", "tagId")
    VALUES ("groupId", new_tag_id);


    PERFORM notify_all("createdBy", "groupId", 'New Tag', 'A new tag has been added.', "createdAt");

END;
$$ language plpgsql;