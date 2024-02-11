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

  const { data: groupInfo, error: err2 } = await supabase.rpc("get_group", {
    group_id: Number.parseInt(params.groupId),
  });
  //console.log("In Load method of Post Requests");
  //console.log(groupInfo);

  const { data: postRequests, error: err3 } = await supabase.rpc(
    "get_requested_posts",
    {
      group_id: Number.parseInt(params.groupId),
    }
  );
  //console.log("In Load method of Post Requests");
  //console.log(postRequests);

  if (err2) {
    return fail(400, { error: err2.message });
  }

  return {
    groupInfo: groupInfo,
    postRequests: postRequests,
  };
};
