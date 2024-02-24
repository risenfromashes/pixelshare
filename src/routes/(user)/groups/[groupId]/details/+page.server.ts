import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
	default: async ({ request, params, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		console.log("here is the form data");
		console.log(formData);
		//const postedBy = formData.get("username") as String;
		const postId = Number.parseInt(formData.get("postId")?.toString() ?? "0");
		//const caption = formData.get("caption") as String;
		const isApproved = formData.get("action") as String;
		const {
			data: { user },
			error: err1,
		} = await supabase.auth.getUser();

		if (err1 || !user) {
			return redirect(302, "/login");
		}

		const username = await getUsername(supabase, user.id);
		const session = await getSession();
		if (!session) {
			return redirect(302, "/login");
		}

		console.log(isApproved);
		if (isApproved === "true") {
			console.log("the post should be liked");
			const { data, error } = await supabase.rpc("like_post", {
				post_id: postId,
				user_id: session.user.id,
			});

			if (error) {
				console.log(error);
				return fail(400, { error: error.message });
			}
			return { success: true };
		} else {
			console.log("dislike khau tumi post fuuuuuuuuuuuuu");
			const { data, error } = await supabase.rpc("dislike_post", {
				post_id: postId,
				user_id: session.user.id,
			});

			if (error) {
				console.log(error);
				return fail(400, { error: error.message });
			}
			return { success: false };
		}
	},
};
