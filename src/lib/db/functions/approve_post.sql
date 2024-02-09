-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
DROP function approve_post(bigint, text);

CREATE OR REPLACE FUNCTION approve_post(post_id bigint, user_name text) RETURNS void AS $$
BEGIN
    UPDATE "Post"
    SET "status" = 'approved',
    "approvedBy" = user_name
    WHERE "id" = post_id;
END;
$$ LANGUAGE plpgsql;