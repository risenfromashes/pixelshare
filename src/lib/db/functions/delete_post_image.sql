-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function delete_post_image (post_id bigint, image_url text) returns void as $$
BEGIN
  delete from public."PostImages"
  where
    "postId" = post_id
    and "imageId" = (select id from public."Image" where url = image_url);
END;
$$ language plpgsql;