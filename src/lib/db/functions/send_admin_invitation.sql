CREATE OR REPLACE PROCEDURE send_admin_invitation(group_id int, message TEXT,username TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insert a new invitation into the admin_invitations table
    INSERT INTO adminModerator (invitation_id, username,group_id,message,sent_at,status)
    VALUES (uuid_generate_v4(), username, group_id, message, now(), 'pending');
    
    -- You can add additional logic here if needed, like sending an email notification
END;
$$;
