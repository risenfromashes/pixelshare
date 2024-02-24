-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

drop function get_recommended_moderators(int8);
CREATE OR REPLACE FUNCTION get_recommended_moderators (gid int8) 
RETURNS TABLE (
  "userId" TEXT,
  "username" TEXT,
  "joinedAt" TIMESTAMPTZ,
  "postCount" INT,
  "profileImg" TEXT
) 
LANGUAGE SQL 
AS $$ 
SELECT 
    u.id AS "userId", 
    u.username, 
    u."joiningDate" AS "joinedAt", 
    COUNT(p.id) AS "postCount", 
    u."profileImg" AS "profileImg"
FROM 
    "GroupMembers" gm 
LEFT JOIN 
    "Post" p ON gm."memberId" = p."createdBy" 
LEFT JOIN 
    "User" u ON gm."memberId" = u.id 
WHERE 
    gm."groupId" = gid 
    AND gm."memberId" NOT IN (
        SELECT ga."adminId" 
        FROM "GroupAdmins" ga 
        WHERE ga."groupId" = gm."groupId" -- Correlate with outer query
          AND ga."adminId" = gm."memberId"
    ) 
GROUP BY 
    u.id
ORDER BY 
    COUNT(p.id) DESC; 
$$;


-- select * from get_recommended_moderators ('1');