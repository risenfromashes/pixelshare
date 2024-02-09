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
	//console.log("hereeeeeeeeeeeeeeeeee");
	//console.log(params.groupId);

	const { data, error } = await supabase.rpc("get_requests", {
		gid: Number.parseInt(params.groupId),
	});
	//console.log(data);

	if (error) {
		return { error: error.message };
	}
	if (!data) {
		return {
			requests: [],
		};
	}

	//console.log(data);

	return {
		requests: data,
	};
};