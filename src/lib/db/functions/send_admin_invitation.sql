drop function add_admin_moderation(int,text,timestamp,text);
CREATE OR REPLACE FUNCTION add_admin_moderation(
    group_id INT,
    message TEXT,
    sent_time TIMESTAMP,
    user_name TEXT
) RETURNS VOID AS $$
DECLARE
    u_id text;
BEGIN
    -- Use the INTO clause for the SELECT statement to assign the result to the variable directly
    SELECT u.id INTO u_id FROM "User" u WHERE u.username = user_name;

    -- Use double quotes around column names if necessary, and use consistent case (e.g., "groupId" instead of groupId)
    INSERT INTO "AdminModerator" ("groupId", "message", "sent_time", "uId", "status")
    VALUES (group_id, message, sent_time, u_id, 'pending');

END;
$$ LANGUAGE plpgsql;