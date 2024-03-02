-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create
or replace function public.get_tags_for_image (image_id bigint) returns table ("tagId" bigint, "tagName" text) as $$
BEGIN
  RETURN QUERY
  select
    t.id as "tagId",
    t."tagName"
  from
    public."Tag" t
    inner join public."ImageTags" it on t.id = it.tag_id
  where
    it.image_id = image_id;
END;
$$ language plpgsql;