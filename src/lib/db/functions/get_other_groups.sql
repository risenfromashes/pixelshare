
create
or replace function get_other_groups (member_id text) returns table (name text) as $$ BEGIN RETURN QUERY select g.name from "Group" g where id not in ( select "groupId" from "GroupMembers" where "memberId" = member_id and status = 'joined') and id not in( select id from "Group" where "createdBy" = member_id ); END; $$ language plpgsql;