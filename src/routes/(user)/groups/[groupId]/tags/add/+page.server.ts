import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		console.log("ekhaneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
		const formData = await request.formData();
		console.log(formData);
		console.log("yoooooooooooooooooooooooo");
		const files = formData.getAll("files") as File[];
		const tagName = formData.get("name") as string;
		const description = formData.get("description") as string;
		const generalName=formData.get("generalName") as string;

		console.log("Action called");
		console.log(tagName);

		const {
			data: { user },
			error: err1,
		} = await supabase.auth.getUser();

		if (err1 || !user) {
			return redirect(302, "/login");
		}

		if (!files || files.length === 0) {
			return fail(400, { invalid: true });
		}

		let paths = [];
		for (const file of files) {
			const { data, error } = await supabase.storage
				.from("images")
				.upload(v4() + "." + file.name.split(".").pop(), file);

			if (error) {
				await supabase.storage.from("images").remove(paths);
				return fail(400, { error: "Storage error: " + error.message });
			} else {
				paths.push(data.path);
			}
		}

		const urls = paths.map((path) => {
			return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
		});

		const date = new Date();
		const username = await getUsername(supabase, user.id);

		const { data, error } = await supabase.rpc("add_tag", {
			tagName: tagName,
			createdBy: username,
			description: description,
			createdAt: date,
			tagImage: urls[0],
			groupId: params.groupId,
			short_desc:generalName,
		});

		if (error) {
			console.log(error);
			await supabase.storage.from("images").remove(paths);
			return fail(400, { error: error.message });
		}




		return { success: true };
	},
};



