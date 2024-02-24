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



  const { data, error } = await supabase.rpc("get_recommended_moderators", {
    gid: Number.parseInt(params.groupId),
  });
  console.log("recommended moderators");
  console.log(data);

  if (error) {
    return { error: error.message };
  }
  if (!data) {
    return {
      requests: [],
    };
  }

  //console.log(data);
  const userId= session.user.id;

  console.log("jala:"+userId);

  return {
    requests: data,
    userId: userId,
  };
};
