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



DROP FUNCTION IF EXISTS approve_post(bigint, text);

CREATE OR REPLACE FUNCTION approve_post(post_id bigint, user_name text) RETURNS void AS $$
DECLARE
    content text;
    group_id bigint;
BEGIN
    -- Update the post status and approvedBy fields
    UPDATE "Post"
    SET "status" = 'approved',
        "approvedBy" = user_name
    WHERE "id" = post_id;

    -- Assuming there's a relation between posts and groups, find the group ID related to the post
    SELECT "groupId" INTO group_id FROM "Post" WHERE "id" = post_id;

    -- Construct the notification content
    content := 'A post has been approved by ' || user_name;

    -- Notify all users or group members (adapt parameters as needed for your notification function)
    -- This is an example; replace with actual function name and parameters
    PERFORM notify_all(group_id, 'Post Approved', content, CURRENT_TIMESTAMP);
END;
$$ LANGUAGE plpgsql;
