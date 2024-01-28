import { getUsername } from "$lib/db/functions/helpers.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ request, parent, locals: { supabase } }) => {
  // If the user is not logged in, redirect to login page
  const { session } = await parent();
  if (!session) {
    return redirect(302, "/login");
  }

  const { data, error: err } = await supabase.rpc("get_groups", {
    uid: session.user.id,
  });

  if (err) {
    return {
      session,
      error: err.message,
    };
  }

  return {
    session,
    username: await getUsername(supabase, session.user.id),
    groups: data,
  };
};
