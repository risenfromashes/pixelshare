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

	//console.log("HEREEEEEEEEEEEEEEEEEEE EDIT POSTTTTTTTTTTTTTTTTTTTTTTT");
	//console.log(params.groupId);

	const { data: images, error } = await supabase.rpc("get_images_edit", {
		group_id: Number.parseInt(params.groupId),
	});

	if (error) {
		//console.log("error here");
		//console.log(error);
		return { error: error.message };
	}
	if (images) {
		console.log("Here in editPost");
		//console.log(images);
		return {
			images: images,
		};
	}
}
