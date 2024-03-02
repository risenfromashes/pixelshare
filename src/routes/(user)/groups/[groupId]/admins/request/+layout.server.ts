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

  const { data:data2, error: err2 } = await supabase.rpc("is_admin", {
    gid: Number.parseInt(params.groupId),
    userid: session.user.id,
  });
  
  if (err2) {
    console.error("Error calling is_admin function:", err2);
  }
  
  console.log("recommended moderators, isAdmin:", data2);
  console.log(data);

  if (error) {
    return { error: error.message };
  }
  if (!data) {
    return {
      requests: [],
    };
  }
  // if(!isAdmin){
  //   return {
  //     isAdmin: false,
  //   };
  // }

  //console.log(data);
  const userId= session.user.id;

  console.log("jala:"+userId);

  return {
    requests: data,
    userId: userId,
    isAdmin: data2,
  };
};
