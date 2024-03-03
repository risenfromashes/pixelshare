
create
or replace function public.get_top_images_by_tag (gid bigint, tid bigint, n integer) returns table (id bigint, score double precision, url text) as $$
BEGIN
    RETURN QUERY
    SELECT its."imageId", its.score, i.url
    FROM public."ImageTagScores" its
    JOIN public."Image" i ON its."imageId" = i.id
    JOIN public."PostImages" pi ON i.id = pi."imageId"
    JOIN public."Post" p ON p."id" = pi."postId"
    WHERE its."tagId" = tid
    AND p."groupId" = gid
    ORDER BY its.score DESC
    LIMIT n;
END;
$$ language plpgsql;

-- select * from get_top_images_by_tag(1, 3, 100);