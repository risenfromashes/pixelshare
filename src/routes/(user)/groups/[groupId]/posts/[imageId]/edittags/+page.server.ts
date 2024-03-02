import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log(formData);
		console.log("EKHANEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
		const what_to_do = formData.get("what") as string;
		const tag_id = formData.get("tagId") as BigInteger;
		const image_id = params.imageId;

		console.log("image_id");
		console.log(tag_id);


		const {
			data: { user },
			error: err1,
		} = await supabase.auth.getUser();

		if (err1 || !user) {
			return redirect(302, "/login");
		}

		if (what_to_do === 'add') {
			const { data, error } = await supabase.rpc("update_image_tags", {
				tag_id_given: tag_id,
				image_id_given: image_id,
				tag_value: 'true',
			});
			if (error) {
				console.log(error);
				return fail(400, { error: error.message });
			}
			return { success: true };
		}
		else if (what_to_do === 'remove') {
			const { data, error } = await supabase.rpc("update_image_tags", {
				tag_id_given: tag_id,
				image_id_given: image_id,
				tag_value: 'false',
			});
			if (error) {
				console.log(error);
				return fail(400, { error: error.message });
			}
			return { success: true };
		}
		else {
			console.log("jhamela");
		}


	},
};
