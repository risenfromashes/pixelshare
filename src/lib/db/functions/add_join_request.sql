

create
or replace function add_join_request (
  group_name text,
  member_id text,
  joining_date date,
  approved_by text,
  status text
) returns void as $$ BEGIN INSERT INTO public."GroupMembers" ("groupId", "memberId", "joiningDate", "approvedBy", status) VALUES ( ( SELECT id FROM public."Group" WHERE name = group_name ), member_id, joining_date, approved_by, status ); END; $$ language plpgsql;