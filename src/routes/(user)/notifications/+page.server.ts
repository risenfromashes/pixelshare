import { fail, redirect } from "@sveltejs/kit";

interface NotificationData {
  id: string;
  username: string;
  profileImg: string;
  title: string;
  content: string;
  createdAt: Date;
  seen: Boolean;
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

  // Assuming you want to mark each notification as seen immediately after fetching
  for (const notification of data) {
    if (!notification.seen) { // Check if the notification hasn't been seen yet
      await supabase.rpc("set_notification_seen", { notification_id: notification.id });
      // Update the notification as seen in your local data, if necessary
      //notification.seen = true;
    }
  }

  return {
    notifications: data as NotificationData[],
  };
};
