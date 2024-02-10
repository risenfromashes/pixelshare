-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- drop function if exists get_similar_images_in_group (int8, text, double precision, vector, integer);

create
or replace function public.get_similar_images_in_group (
  gid int8,
  "modelName" text,
  threshold double precision,
  vector public.vector,
  n integer
) returns table (
  id int8,
  postId int8,
  url text,
  similarity double precision
) as $$ 
BEGIN 
    RETURN QUERY
        SELECT i.id, pi."postId" as postId, i.url, ie.embedding <=> vector as cosine_distance FROM public."Image" i 
        JOIN public."ImageEmbedding" ie ON i.id = ie."imageId" 
        JOIN public."PostImages" pi ON i.id = pi."imageId"
        JOIN public."Post" p ON pi."postId" = p.id
        WHERE ie.model = "modelName"
        AND (ie.embedding <=> vector) >= threshold 
        AND p."groupId" = gid
        ORDER BY ie.embedding <=> vector DESC 
        LIMIT n;
END;
$$ language plpgsql;

-- select
--   *
-- from
--   get_similar_images_in_group (
--     1,
--     'clip',
--     0.1,
--     array_fill(1, array[512])::vector,
--     20
--   );