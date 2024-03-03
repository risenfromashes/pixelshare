import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const load = async ({ params, locals: { supabase, getSession } }) => {
	const { data: user, error: err1 } = await supabase.auth.getUser();

	if (err1 || !user) {
		return redirect(302, "/login");
	}
	const session = await getSession();
	if (!session) {
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
	// console.log(session.user.id);
	// console.log(params.groupId);

	const { data: posts, error: err3 } = await supabase.rpc(
		"get_liked_posts",
		{

			group_id: Number.parseInt(params.groupId),
			user_id: session.user.id,
		}
	);

	if (err2) {
		console.log("err2");
		return fail(400, { error: err2.message });
	}


	// console.log(posts);

	// const {data: comments , error: err4} = await supabase.rpc("get_comments_by_post", {
	// 	group_id: Number.parseInt(params.groupId),
	// });

	// if (err4) {
	// 	console.log("err4");
	// 	return fail(400, { error: err4.message });
	// }
	// console.log("ekhaneeeeeeeeeeeeeeeeeee  liked posts");
	// console.log("comments:");
	// console.log(comments);

	return {
		groupInfo: groupInfo,
		posts: posts,
		
	};
};