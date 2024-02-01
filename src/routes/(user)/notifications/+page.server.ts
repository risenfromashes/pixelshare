import { fail, redirect } from "@sveltejs/kit";

interface NotificationData {
  id: string;
  username: string;
  profileImg: string;
  title: string;
  content: string;
  createdAt: Date;
}

export const load = async ({
  request,
  params,
  locals: { supabase, getSession },
}) => {
  const session = await getSession();
  if (!session) {
    return redirect(302, "/login");
  }

  const { data, error } = await supabase.rpc("get_notifications", {
    user_id: session.user.id,
  });

  if (error) {
    return { error: error.message };
  }
  if (!data) {
    return {
      notifications: [],
    };
  }

  // console.log(data);

  return {
    notifications: data as NotificationData[],
  };
};
