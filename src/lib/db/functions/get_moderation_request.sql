create
or replace function get_moderation_requests (uname text) returns table (
  "id" INT8,
  "username" text,
  "message" text,
  "status" text,
  "groupId" INT8,
  "sent_time" TIMESTAMPTZ
) language sql as $$

  SELECT 
    am."id" AS "id", 
    u."username",  
    am."message", 
    am."status", 
    am."groupId",
    am."sent_time" 
  FROM 
    "AdminModerator" am
  JOIN 
    "User" u ON am."uId" = u."id"
  WHERE 
    u."username" = uname
    AND am."status" = 'pending';