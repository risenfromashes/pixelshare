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
	// groups jegular admin na, but member
	
	




	const { data: user, error: err6 } = await supabase.rpc(
		"get_user_details",
		{
			user_id: session.user.id,
		}
	);
	if (err6) {
		console.log(err6);
		return {
			session,
			error: err6.message,
		};
	}

	return {
		user: user,
		user_id: session.user.id,
	};


	// const { data, error } = await supabase.rpc("get_tags", {
	// 	gid: Number.parseInt(params.groupId),
	// });
	// console.log(data);

	// if (error) {
	// 	return { error: error.message };
	// }
	// if (!data) {
	// 	return {
	// 		tags: [],
	// 	};
	// }

	// console.log(data);

	// return {
	// 	tags: data,
	// };
};
