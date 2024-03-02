DROP FUNCTION IF EXISTS approve_member(bigint, text);

CREATE OR REPLACE FUNCTION approve_member(group_id bigint, user_name text) RETURNS void AS $$
DECLARE
    userId text;
    groupName text;
    content text;
    createdAt timestamp;
BEGIN
    -- Fetch the user ID based on username
    SELECT id INTO userId FROM "User" WHERE "username" = user_name;

    -- Fetch the group name based on group ID
    SELECT "name" INTO groupName FROM "Group" WHERE "id" = group_id;

    -- Set the content for the notification
    content := 'Your membership request to ' || groupName || ' has been approved';

    -- Update the GroupMembers to set status as 'joined'
    UPDATE "GroupMembers"
    SET status = 'joined'
    WHERE "groupId" = group_id AND "memberId" = userId;

    -- Get current timestamp
    createdAt := CURRENT_TIMESTAMP;

    -- Perform notification (assuming the notify function exists and works with these parameters)
    PERFORM notify(userId, 'Member Request Approved', content, createdAt);
END;
$$ LANGUAGE plpgsql;
