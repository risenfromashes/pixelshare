create
or replace function public.set_notification_seen (notification_id bigint) returns void as $$
BEGIN
  update public."Notification"
  set
    seen = true
  where
    id = notification_id;
END;
$$ language plpgsql;