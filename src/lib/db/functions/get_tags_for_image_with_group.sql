-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

drop function get_tags_for_image_with_group(bigint, bigint);

create
or replace function public.get_tags_for_image_with_group (image_id_given bigint, group_id bigint) returns table ("tagId" bigint, "tagName" text) as $$ BEGIN RETURN QUERY select t."id" as "tagId", t."tagName" from public."Tag" t inner join public."ImageTags" it on t."id" = it."tag_id" inner join public."GroupTags" gt on gt."tagId" = t."id" where it."image_id" = image_id_given and gt."groupId" = group_id and it.value = true; END; $$ language plpgsql;