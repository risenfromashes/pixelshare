import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
  default: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    console.log("here is the form data");
    console.log(formData);
    const groupName = formData.get("groupname") as String;
    const {
      data: { user },
      error: err1,
    } = await supabase.auth.getUser();

    if (err1 || !user) {
      return redirect(302, "/login");
    }

    const date = new Date();

    const { data, error } = await supabase.rpc("add_join_request", {
      group_name: groupName,
      member_id: user.id,
      joining_date: date,
      approved_by: "",
      status: "requested",
    });

    if (error) {
      console.log(error);
      return fail(400, { error: error.message });
    }
    return { success: true };
  },
};
