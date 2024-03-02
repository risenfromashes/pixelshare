

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




-- drop function if exists get_similar_images_in_group_by_image(bigint, bigint, double precision, integer);

create
or replace function public.get_similar_images_in_group_by_image (
  iid bigint,
  gid bigint,
  threshold double precision,
  n integer
) returns table (id bigint, url text, similarity double precision) as $$
DECLARE
    model_name text := 'dinov2';
BEGIN
    RETURN QUERY
    SELECT ie."imageId", i.url,
           (1 - (ie.embedding <=> (SELECT embedding FROM public."ImageEmbedding" WHERE "imageId" = iid AND model = model_name))) AS similarity
    FROM public."ImageEmbedding" ie
    JOIN public."PostImages" pi ON ie."imageId" = pi."imageId"
    JOIN public."Post" p ON pi."postId" = p.id
    JOIN public."Image" i ON i."id" = "ie"."imageId"
    WHERE ie."imageId" <> iid
    AND ie.model = model_name
    AND (1 - (ie.embedding <=> (SELECT embedding FROM public."ImageEmbedding" WHERE "imageId" = iid AND model = model_name))) >= threshold
    AND p."groupId" = gid
    ORDER BY similarity DESC
    LIMIT n;
END;
$$ language plpgsql;

-- select * from get_similar_images_in_group_by_image(108, 1, 0.4, 10);