create
or replace function get_my_groupIds (userId text) returns setof bigint as $$
BEGIN
    RETURN QUERY
    SELECT "groupId"
    FROM "GroupMembers"
    WHERE "memberId" = userId;
END;
$$ language plpgsql;