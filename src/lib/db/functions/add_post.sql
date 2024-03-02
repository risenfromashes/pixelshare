
--drop function add_post(text, text, text, integer, timestamptz, text[]);
create or replace function add_post(
   "status" text,
    "caption" text,
    "location" text,
    "createdBy" text,
    "groupId" integer,
    "createdAt" timestamptz,
    "pictureUrls" text[]
)
returns void as $$
declare
    new_post_id integer;
    new_image_id integer;
    url text;
begin
    -- insert into post table
    insert into "Post" ("status", "caption", "location", "groupId", "createdAt", "createdBy", "approvedBy")
    values ("status", "caption", "location", "groupId", "createdAt", "createdBy", "createdBy")
    returning id into new_post_id;

    -- loop through each picture path and insert into image and postimages table
    foreach url in array "pictureUrls"
    loop
        insert into "Image" ("url")
        values (url)
        returning id into new_image_id;

        insert into "PostImages" ("postId", "imageId")
        values (new_post_id, new_image_id);
    end loop;


    PERFORM notify_all("createdBy", "groupId", 'New Post', 'A new post has been approved.', "createdAt");
end;
$$ language plpgsql;
