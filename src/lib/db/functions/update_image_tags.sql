create
or replace function public.update_image_tags (tag_id bigint, image_id bigint, tag_value boolean) returns void as $BODY$ 
BEGIN 
    insert into public."ImageTags" (image_id, tag_id, value) values (image_id, tag_id, tag_value) on conflict (image_id, tag_id) do nothing; 
    update public."ImageTags" set value = tag_value where tag_id = tag_id and image_id = image_id; 
END; $BODY$ language plpgsql;