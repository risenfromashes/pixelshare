drop function get_images_edit(bigint);

create
or replace function get_images_edit (group_id bigint) returns table (post_id bigint, image_id bigint, url text) as $$ BEGIN RETURN QUERY select pi."postId", i.id as image_id, i.url from "Image" i inner join "PostImages" pi on i.id = pi."imageId" inner join "Post" p on pi."postId" = p.id where p."groupId" = group_id; END; $$ language plpgsql;