-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

drop function get_recommended_moderators(int8);
CREATE OR REPLACE FUNCTION get_recommended_moderators(gid INT8) 
RETURNS TABLE (
  "userId" TEXT,
  "username" TEXT,
  "joinedAt" TIMESTAMPTZ,
  "postCount" INT,
  "profileImg" TEXT,
  "isReq" BOOLEAN
) 
LANGUAGE SQL 
AS $$ 
SELECT 
    u.id AS "userId", 
    u.username, 
    u."joiningDate" AS "joinedAt", 
    COUNT(p.id) AS "postCount", 
    u."profileImg" AS "profileImg",
    (COUNT(am."uId") > 0 AND COUNT(am."uId") = COUNT(CASE WHEN am."status" = 'pending' THEN 1 END)) AS "isReq"
FROM 
    "GroupMembers" gm 
LEFT JOIN 
    "Post" p ON gm."memberId" = p."createdBy" 
LEFT JOIN 
    "User" u ON gm."memberId" = u.id 
LEFT JOIN 
    "AdminModerator" am 
        ON u.id = am."uId" 
        AND gm."groupId" = am."groupId"
WHERE 
    gm."groupId" = gid 
    AND gm."memberId" NOT IN (
        SELECT ga."adminId" 
        FROM "GroupAdmins" ga 
        WHERE ga."groupId" = gm."groupId" 
          AND ga."adminId" = gm."memberId"
    ) 
GROUP BY 
    u.id
ORDER BY 
    COUNT(p.id) DESC; 
$$;


-- perform get_recommended_moderators('1');

-- select
--   *
-- from
--   get_recommended_moderators ('1');