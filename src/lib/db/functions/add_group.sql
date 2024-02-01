-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- DROP FUNCTION add_group(text,text,text,timestamptz,text,text);

create
or replace function add_group (
  "name" text,
  "createdBy" text,
  "description" text,
  "createdAt" timestamptz,
  "coverImg" text,
  "profileImg" text
) returns VOID as $$
DECLARE
    new_group_id bigint;
BEGIN
   -- insert into group table
    INSERT INTO "Group" ("name", "createdBy", "description", "createdAt", "coverImg", "profileImg")
    VALUES ("name", "createdBy", "description", "createdAt", "coverImg", "profileImg")
    RETURNING id INTO new_group_id;

    -- add user as member
    INSERT INTO "GroupMembers" ("groupId", "memberId", "joiningDate", "approvedBy")
    VALUES (new_group_id, "createdBy", "createdAt", "createdBy");

    -- add user as admin
    INSERT INTO "GroupAdmins" ("groupId", "adminId")
    VALUES (new_group_id, "createdBy");

END;
$$ language plpgsql;