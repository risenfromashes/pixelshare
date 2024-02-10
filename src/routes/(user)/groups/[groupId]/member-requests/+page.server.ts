import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log("here is the form data");
		console.log(formData);
		const username = formData.get("username") as String;
		const isApproved = formData.get("action") as String;

		console.log(isApproved);
		if (isApproved === 'true') {
			console.log("here he should be accepted");
			const { data, error } = await supabase.rpc("approve_member", {
				group_id: Number.parseInt(params.groupId),
				user_name: username,
			});

			if (error) {
				console.log(error);
				return fail(400, { error: error.message });
			}
			return { success: true };
		}
		else {
			console.log("mara khau");
			const { data, error } = await supabase.rpc("delete_group_member", {
				group_id: Number.parseInt(params.groupId),
				user_name: username,
			});

			if (error) {
				console.log(error);
				return fail(400, { error: error.message });
			}
			return { success: false };
		}
		// const {
		// 	data: { user },
		// 	error: err1,
		// } = await supabase.auth.getUser();

		// const date = new Date();



		// const username = await getUsername(supabase, user.id);


		// return { success: true };
	},
};



