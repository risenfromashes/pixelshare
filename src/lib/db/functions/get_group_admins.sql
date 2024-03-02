-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function get_group_admins (group_id bigint) returns setof text as $$
begin
    return query
    select "adminId"
    from "GroupAdmins"
    where "groupId" = group_id;
end;
$$ language plpgsql;