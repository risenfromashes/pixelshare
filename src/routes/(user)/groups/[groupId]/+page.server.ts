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
    let status: String = "requested";
    //const tags = (formData.get("tags") as string).split(",");

    console.log("Action called");
    //console.log(tags);

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
    // checking if the user is one of the admins of the group

    const { data: admins } = await supabase.rpc("get_group_admins", {
      group_id: params.groupId,
    }
    );

    console.log("here are the group admins");
    console.log(admins);

    const user_id = user.id;

    // Check if the user_id is in the admins array
    let isAdmin: Boolean = false;
    for (const admin of admins) {
      if (admin === user_id) {
        isAdmin = true;
        break;
      }
    }

    if (isAdmin === true) {
      status = "approved"; // ami nijei admin
    } else {
      status = "requested"; // for others
    }


    const { error } = await supabase.rpc("add_post", {
      status: status,
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



