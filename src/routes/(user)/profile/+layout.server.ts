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
	const { data: non_admin_groups, error: err3 } = await supabase.rpc(
		"get_non_admin_groups",
		{
			user_id: session.user.id,
		}
	);
	if (err3) {
		console.log(err3);
		return {
			session,
			error: err3.message,
		};
	}
	// console.log("ami egular admin na");
	// console.log(non_admin_groups);

	// groups jegular admin +  member
	const { data: admin_groups, error: err4 } = await supabase.rpc(
		"get_admin_groups",
		{
			user_id: session.user.id,
		}
	);
	if (err4) {
		console.log(err4);
		return {
			session,
			error: err4.message,
		};
	}
	// console.log("ami egular admin");
	// console.log(admin_groups);







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
	// console.log("amiiiiiiiiiiiiiiiii");
	// console.log(user);

	return {
		non_admin_groups: non_admin_groups,
		admin_groups: admin_groups,
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
