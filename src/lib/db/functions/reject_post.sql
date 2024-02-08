DROP function reject_post(bigint, text);

CREATE OR REPLACE FUNCTION reject_post(post_id bigint, user_name text) RETURNS void AS $$
BEGIN
    UPDATE "Post"
    SET "status" = 'rejected',
    "approvedBy" = user_name
    WHERE "id" = post_id;
END;
$$ LANGUAGE plpgsql;