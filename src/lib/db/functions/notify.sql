-- drop function if exists notify(text, text, text, timestamptz);

create or replace function notify (
  "userId" text,
  title text,
  content text,
  "createdAt" timestamptz
) returns void as $$
begin 
  insert into "Notification" ("userId", content, seen, "createdAt", title) 
  values ("userId", content, false, "createdAt", title); 
end; 
$$ language plpgsql;

-- drop function if exists notify_all(int8, text, text, timestamptz);

create or replace function notify_all (
  uid text,
  gid int8,
  title text,
  content text,
  "createdAt" timestamptz
) returns void as $$
declare
  member_id text;
begin 
  for member_id in (select "memberId" from "GroupMembers" where gid = "groupId") loop
    if member_id <> uid then
      perform notify(member_id, title, content, "createdAt");
    end if;
  end loop;
end; 
$$ language plpgsql;

-- select notify_all('1', 'hellooo', 'Hello Guyzzzzzzz 2', '2024-01-28');