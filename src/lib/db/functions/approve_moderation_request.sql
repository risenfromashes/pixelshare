CREATE OR REPLACE FUNCTION approve_moderation_request(req_id int8) RETURNS void AS $$
BEGIN
    UPDATE "AdminModerator"
    SET "status" = 'approved'
    WHERE "id" = req_id;

    Insert into "GroupAdmins" ("groupId", "adminId") values (
        (SELECT "groupId" FROM "AdminModerator" WHERE "id" = req_id),
        (SELECT "uId" FROM "AdminModerator" WHERE "id" = req_id)
    );
END;
$$ LANGUAGE plpgsql;