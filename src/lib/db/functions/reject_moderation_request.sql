CREATE OR REPLACE FUNCTION reject_moderation_request(req_id int8) RETURNS void AS $$
BEGIN
    -- UPDATE "AdminModerator"
    -- SET "status" = 'rejected'
    -- WHERE "id" = req_id;

    Delete from "AdminModerator" where "id" = req_id;
END;
$$ LANGUAGE plpgsql;