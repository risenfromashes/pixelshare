-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

drop function get_tags_for_group_not_in_image(bigint, bigint);

create
or replace function public.get_tags_for_group_not_in_image (image_id_given bigint, group_id bigint) returns table ("tagId" bigint, "tagName" text, "value" boolean) as $$ BEGIN RETURN QUERY select t."id" as "tagId", t."tagName", it.value from public."Tag" t inner join public."GroupTags" gt on gt."tagId" = t."id" left join public."ImageTags" it on it."tag_id" = t."id" and it."image_id" = image_id_given where (it.value is null or it.value = false) and gt."groupId" = group_id; END; $$ language plpgsql;