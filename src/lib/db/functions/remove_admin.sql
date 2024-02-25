-- create
-- or replace function remove_admin (group_id int8, user_id text) returns void as $$
-- BEGIN

--     DELETE FROM "GroupAdmins" as ga
--     WHERE "group_id" = ga."groupId"
--     AND ga."adminId" = user_id;
-- END;
-- $$ language plpgsql;

create
or replace function resign_admin (group_id int8, user_id text) returns void as $$
BEGIN

    DELETE FROM "GroupAdmins" as ga
    WHERE "group_id" = ga."groupId"
    AND ga."adminId" = user_id;
END;
$$ language plpgsql;