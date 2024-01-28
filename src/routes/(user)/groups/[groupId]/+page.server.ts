import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
  upload: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const caption = formData.get("caption") as string;
    const location = formData.get("location") as string;
    const tags = (formData.get("tags") as string).split(",");

    console.log("Action called");
    console.log(tags);

    const {
      data: { user },
      error: err1,
    } = await supabase.auth.getUser();

    if (err1 || !user) {
      return redirect(302, "/login");
    }

    if (!params.groupId) {
      return fail(400, { invalid: true });
    }

    if (!files || files.length === 0) {
      return fail(400, { invalid: true });
    }

    let paths = [];
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(v4() + "." + file.name.split(".").pop(), file);

      if (error) {
        await supabase.storage.from("images").remove(paths);
        return fail(400, { error: "Storage error: " + error.message });
      } else {
        paths.push(data.path);
      }
    }

    const urls = paths.map((path) => {
      return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
    });

    const date = new Date();

    const { error } = await supabase.rpc("add_post", {
      caption: caption,
      location: location,
      createdBy: user.id,
      groupId: params.groupId,
      createdAt: date,
      pictureUrls: urls,
    });

    if (error) {
      await supabase.storage.from("images").remove(paths);
      return fail(400, { error: error.message });
    }

    const username = await getUsername(supabase, user.id);
    const groupname = await getGroupname(supabase, params.groupId);

    console.log(
      `Notifying all users in ${groupname} about post by ${username} on ${date.toLocaleString()}`
    );

    if (username && groupname) {
      await supabase.rpc("notify_all", {
        uid: user.id,
        gid: Number.parseInt(params.groupId),
        title: "New post",
        content: `${username} posted in ${groupname} on ${date.toLocaleString()}`,
        createdAt: date,
      });
    }

    return { success: true };
  },
};

export const load = async ({ request, params, locals: { supabase } }) => {
  const { data: user, error: err1 } = await supabase.auth.getUser();

  if (err1 || !user) {
    return redirect(302, "/login");
  }

  if (!params.groupId) {
    return fail(400, { invalid: true });
  }

  const { data, error: err2 } = await supabase.rpc("get_group_images", {
    gid: Number.parseInt(params.groupId),
  });

  if (err2) {
    return fail(400, { error: err2.message });
  }

  return {
    images: data,
  };
};
