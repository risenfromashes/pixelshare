DROP FUNCTION IF EXISTS add_admin_moderation(int, text, timestamp, text);

CREATE OR REPLACE FUNCTION add_admin_moderation(
    group_id INT,
    message TEXT,
    sent_time TIMESTAMP,
    user_name TEXT
) RETURNS VOID AS $$
DECLARE
    u_id TEXT;
    content TEXT;
BEGIN
    -- Retrieve user id from username
    SELECT u.id INTO u_id FROM "User" u WHERE u.username = user_name;

    -- Insert new admin or moderation request
    INSERT INTO "AdminModerator" ("groupId", "message", "sent_time", "uId", "status")
    VALUES (group_id, message, sent_time, u_id, 'pending');

    -- Prepare the notification content
    content := 'A new admin/moderation request has been made by ' || user_name;

    -- Perform the notification
    -- Assuming notify function exists and takes parameters: user_id, title, content
    PERFORM notify(u_id, 'New Admin/Moderation Request', content, sent_time);

END;
$$ LANGUAGE plpgsql;
