-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

DROP function approve_member(bigint, text);

CREATE OR REPLACE FUNCTION approve_member(group_id bigint, user_name text) RETURNS void AS $$
BEGIN
    UPDATE "GroupMembers"
    SET status = 'joined'
    WHERE "groupId" = group_id AND "memberId" = (
        SELECT id FROM "User" u WHERE u."username" = user_name
    );
END;
$$ LANGUAGE plpgsql;