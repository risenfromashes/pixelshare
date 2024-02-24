import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const load = async ({ request, params, locals: { supabase } }) => {
  const { data: user, error: err1 } = await supabase.auth.getUser();

  if (err1 || !user) {
    return redirect(302, "/login");
  }

  if (!params.groupId) {
    return fail(400, { invalid: true });
  }

  const username = await getUsername(supabase, user.user.id);
  console.log("username is " + username);

  const { data: moderationRequests, error: err3 } = await supabase.rpc(
    "get_moderation_requests",
    {
      uname: username, // Correct the parameter name to match the stored procedure
    }
  );

  console.log(moderationRequests);

  if (err3) {
    return fail(400, { error: err3.message });
  }

  return {
    moderationRequests: moderationRequests,
  };
};
