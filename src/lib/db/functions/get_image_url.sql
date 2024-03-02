
-- drop function if exists get_image_url(bigint);

create
or replace function public.get_image_url (iid bigint) returns table(url text) as $$
DECLARE
    image_url text;
BEGIN
    RETURN QUERY
    SELECT i.url FROM public."Image" i WHERE i.id = iid;
END;
$$ language plpgsql;

-- select * from get_image_url(108);