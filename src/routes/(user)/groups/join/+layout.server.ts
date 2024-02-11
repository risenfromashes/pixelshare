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
  const {
    data: { user },
    error: err1,
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(302, "/login");
  }

  console.log("hereeeeeeeeeeeeeeeeee");
  console.log(user.id);
  const memberId = user.id;

  const { data, error } = await supabase.rpc("get_other_groups", {
    member_id: user.id,
  });
  console.log("after query");
  console.log(data);

  if (error) {
    console.log(error);
    return { error: error.message };
  }
  if (!data) {
    return {
      groups: [],
    };
  }

  console.log(data);

  return {
    groups: data,
  };
};
