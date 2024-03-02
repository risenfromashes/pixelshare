import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const post_id = formData.get("post_id") as string;
		const url = formData.get("url") as string;
		console.log("in EDITTTTTTTTTTTTTTTTT POSTTTTTTTTTTTTTTT POSTTTTTTTTT");
		console.log(post_id);
		console.log(url);
		const {
			data: { user },
			error: err1,
		} = await supabase.auth.getUser();

		if (err1 || !user) {
			return redirect(302, "/login");
		}

		const username = await getUsername(supabase, user.id);


		const { data, error } = await supabase.rpc("delete_post_image", {
			post_id: Number.parseInt(post_id),
			image_url: url,
		});

		if (error) {
			console.log(error);
			return fail(400, { error: error.message });
		}
		return { success: true };


	},
};
