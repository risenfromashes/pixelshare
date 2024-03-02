CREATE OR REPLACE FUNCTION approve_moderation_request(req_id int8) RETURNS void AS $$
BEGIN
    -- UPDATE "AdminModerator"
    -- SET "status" = 'approved'
    -- WHERE "id" = req_id;

    Insert into "GroupAdmins" ("groupId", "adminId") values (
        (SELECT "groupId" FROM "AdminModerator" WHERE "id" = req_id),
        (SELECT "uId" FROM "AdminModerator" WHERE "id" = req_id)
    );

    Delete from "AdminModerator" where "id" = req_id;
END;
$$ LANGUAGE plpgsql;









CREATE OR REPLACE FUNCTION approve_moderation_request(req_id int8) RETURNS void AS $$
DECLARE
    groupId bigint;
    adminId text;
    groupName text;
    content text;
    createdAt timestamp;
BEGIN
    -- Retrieve groupId and adminId
    SELECT "groupId", "uId" INTO groupId, adminId FROM "AdminModerator" WHERE "id" = req_id;
    
    -- Retrieve groupName
    SELECT "name" INTO groupName FROM "Group" WHERE "id" = groupId;

    -- Insert into GroupAdmins
    INSERT INTO "GroupAdmins" ("groupId", "adminId") VALUES (groupId, adminId);

    -- Delete from AdminModerator
    DELETE FROM "AdminModerator" WHERE "id" = req_id;

    -- Set content for notification
    content := 'Your moderation request for ' || groupName || ' has been approved';
    createdAt := current_timestamp;

    -- Send notification
    PERFORM notify(adminId, 'Moderation Request Approved', content, createdAt);
END;
$$ LANGUAGE plpgsql;
