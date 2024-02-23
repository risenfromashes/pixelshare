drop function get_moderation_requests (uname text);

create
or replace function get_moderation_requests (uname text) returns table (
  "id" int8,
  "username" text,
  "message" text,
  "status" text,
  "groupId" int8,
  "sent_time" timestamptz
) language sql as $$
  SELECT am."id" AS "id", am."username",  am."message", am."status", am."groupId",am."sent_time" FROM 
    "AdminModerator" am

  WHERE am."username"= uname and 
  am."status"='pending'
$$;
