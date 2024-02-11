import { getUsername } from "$lib/db/functions/helpers.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ request, parent, locals: { supabase } }) => {
  // If the user is not logged in, redirect to login page
  const { session } = await parent();
  if (!session) {
    return redirect(302, "/login");
  }

  const { data: groups, error: err } = await supabase.rpc("get_groups", {
    uid: session.user.id,
  });

  if (err) {
    return {
      session,
      error: err.message,
    };
  }
  const { data: pro_pic_url, error: err2 } = await supabase.rpc(
    "get_profile_pic_url",
    {
      user_id: session.user.id,
    }
  );
  if (err2) {
    return {
      session,
      error: err2.message,
    };
  }
  // groups jegular admin na, but member
  const { data: non_admin_groups, error: err3 } = await supabase.rpc(
    "get_non_admin_groups",
    {
      user_id: session.user.id,
    }
  );
  if (err3) {
    console.log(err3);
    return {
      session,
      error: err3.message,
    };
  }
  console.log("ami egular admin na");
  console.log(non_admin_groups);

  // groups jegular admin +  member
  const { data: admin_groups, error: err4 } = await supabase.rpc(
    "get_admin_groups",
    {
      user_id: session.user.id,
    }
  );
  if (err4) {
    console.log(err4);
    return {
      session,
      error: err4.message,
    };
  }
  console.log("ami egular admin");
  console.log(admin_groups);

  return {
    session,
    username: await getUsername(supabase, session.user.id),
    groups: groups,
    pro_pic_url: pro_pic_url,
    non_admin_groups: non_admin_groups,
    admin_groups: admin_groups,
  };
};
