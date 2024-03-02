-- First, drop the existing function if it exists
DROP FUNCTION IF EXISTS edit_profile(text, text, text, text, text);

-- Now, create or replace the 'edit_profile' function
CREATE OR REPLACE FUNCTION edit_profile(
    user_id text,
    user_name text,
    bio2 text,
    location2 text,
    phone_number text,
    img text,
    face text
) RETURNS void AS $$
BEGIN
    -- Perform the update operation on the 'Users' table
    -- Assuming your users table is named "Users" and has columns that match the parameters
    UPDATE "User"
    SET "username" = user_name,
        "bio" = bio2,
        "location" = location2,
        "phoneNumber" = phone_number,
        "profileImg" =img,
        "faceImg"=face
    WHERE "id" = user_id;
END;
$$ LANGUAGE plpgsql;
