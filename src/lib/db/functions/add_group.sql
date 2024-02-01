DROP FUNCTION add_group(text,text,text,date,text,text);
CREATE OR REPLACE FUNCTION add_group(
    "name" text,
    "createdBy" text,
	"description" text,
    "createdAt" date,
    "coverImg" text,
	"profileImg" text
)
RETURNS VOID AS $$
DECLARE
    new_group_id integer;
BEGIN
   -- insert into group table
    INSERT INTO "Group" ("name", "createdBy", "description", "createdAt", "coverImg", "profileImg")
    VALUES ("name", "createdBy", "description", "createdAt", "coverImg", "profileImg");
    
END;
$$ LANGUAGE plpgsql;
