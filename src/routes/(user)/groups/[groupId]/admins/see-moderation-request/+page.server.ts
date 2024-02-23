import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
  default: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    console.log("here is the form data");
    console.log(formData);
    const requestId = Number.parseInt(formData.get("requestId")?.toString() ?? "0");
    const description = formData.get("description") as String;
    const isApproved = formData.get("action") as String; // 'true' for approval, 'false' for rejection
    const {
      data: { user },
      error: err1,
    } = await supabase.auth.getUser();

    if (err1 || !user) {
      return redirect(302, "/login");
    }

    const username = await getUsername(supabase, user.id);

    console.log(isApproved);
    if (isApproved === "true") {
      console.log("the moderation request should be approved");
      const { data, error } = await supabase.rpc("approve_moderation_request", {
        request_id: requestId,
      });

      if (error) {
        console.log(error);
        return fail(400, { error: error.message });
      }
      return { success: true };
    } else {
      console.log("Rejecting the moderation request");
      const { data, error } = await supabase.rpc("reject_moderation_request", {
        request_id: requestId,
      });

      if (error) {
        console.log(error);
        return fail(400, { error: error.message });
      }
      return { success: false };
    }
  },
};
