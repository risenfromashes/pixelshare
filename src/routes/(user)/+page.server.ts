import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

interface Image {
  id: number;
  url: string;
  date: Date;
}
interface ImageGroup {
  name: string;
  images: any[];
}

export const load = async ({ request, params, locals: { supabase } }) => {
  const { data: user, error: err1 } = await supabase.auth.getUser();

  if (err1 || !user) {
    return redirect(302, "/login");
  }

  const { data, error: err2 } = await supabase.rpc("get_images", {
    uid: user.user.id,
  });

  if (err2) {
    return fail(400, { error: err2.message });
  }

  // group images by today, yesterday, last week, previous months(e.g. February 2024, January 2024, December 2023 and so on)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = today;
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  let imageGroups: any = [];

  const months = new Map();
  data.forEach((image: Image) => {
    const date = new Date(image.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    let key;
    if (date >= today) {
      key = "Today";
    } else if (date >= yesterday) {
      key = "Yesterday";
    } else if (date >= lastWeek) {
      key = "Last Week";
    } else {
      key = `${month} ${year}`;
    }
    if (!months.has(key)) {
      months.set(key, []);
    }
    months.get(key).push(image);
  });

  months.forEach((images, name) => {
    imageGroups.push({ name, images });
  });

  return {
    imageGroups: imageGroups,
  };
};
