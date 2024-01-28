import { fail, redirect } from "@sveltejs/kit";

interface NotificationData {
  id: string;
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

  const { data, error } = await supabase
    .from("Notification")
    .select("id, title, content, createdAt")
    .eq("seen", false)
    .eq("userId", session.user.id)
    .order("createdAt", { ascending: false });

  if (error) {
    return { error: error.message };
  }
  if (!data) {
    return {
      notifications: [],
    };
  }

  console.log(data);

  return {
    notifications: data as NotificationData[],
  };
};
