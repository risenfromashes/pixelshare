import { fail, redirect } from "@sveltejs/kit";


export const load = async ({
	request,
	params,
	locals: { supabase, getSession },
}) => {
	const session = await getSession();
	if (!session) {
		return redirect(302, "/login");
	}

	const image_id = params.imageId;
	const group_id = params.groupId;
	console.log("HEREEEEEEEEEEEEEEEEE EDIT TAGSSSSSSSSSSSSSSSSS");
	console.log(image_id);
	console.log(group_id);

	const { data: tags, error } = await supabase.rpc("get_tags_for_image_with_group", {
		image_id_given: Number.parseInt(params.imageId),
		group_id: Number.parseInt(params.groupId),
	});

	if (error) {
		//console.log("error here");
		console.log(error);
		return { error: error.message };
	}
	console.log("EGULAAAAAAAAAAAAAAAAAAA AMARRRRRRRRRRRRRRRRRRRRR");
	console.log(tags);
	const { data: tags_not_in, error: err2 } = await supabase.rpc("get_tags_for_group_not_in_image", {
		image_id_given: Number.parseInt(params.imageId),
		group_id: Number.parseInt(params.groupId),
	});
	if (err2) {
		//console.log("error here");
		console.log(err2);
		return { error: error.message };
	}
	console.log("egula ei image er tags na, just groups er upor");
	console.log(tags_not_in);

	const { data: image_url, error: err3 } = await supabase.rpc("get_image_url_given_id", {
		image_id: Number.parseInt(params.imageId),
	});

	if (err3) {
		//console.log("error here");
		console.log(err3);
		return { error: error.message };
	}
	console.log(image_url);
	return {
		tags: tags,
		image_url: image_url,
		tags_not_in: tags_not_in,
	};
}
