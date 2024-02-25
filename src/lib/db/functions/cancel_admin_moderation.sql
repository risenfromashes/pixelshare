create
or replace function cancel_admin_moderation (group_id int8, user_id text) returns void as $$
BEGIN

    DELETE FROM "AdminModerator" as am
    WHERE "group_id" = am."groupId"
    AND am."uId" = user_id;
END;
$$ language plpgsql;