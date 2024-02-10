-- Always verify the output before executing

create
or replace function public.get_profile_pic_url (user_id text) returns text as $$
BEGIN
    RETURN (SELECT "profileImg" FROM public."User" WHERE id = user_id);
END;
$$ language plpgsql;