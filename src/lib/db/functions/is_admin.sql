CREATE OR REPLACE FUNCTION is_admin(gid INT8, userid TEXT) 
RETURNS BOOLEAN 
LANGUAGE SQL 
AS $$ 
SELECT EXISTS (
    SELECT 1
    FROM "GroupAdmins" ga
    WHERE ga."groupId" = gid
      AND ga."adminId" = userId
);
$$;


-- select * from is_admin('14','0aacc737-0c42-48cd-a069-a8e151cfeb7e');