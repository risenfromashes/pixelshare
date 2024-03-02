import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const load = async ({ request, params, locals: { supabase } }) => {
  const { data: user, error: err1 } = await supabase.auth.getUser();

  const iid = Number.parseInt(params.imageId);
  const gid = Number.parseInt(params.groupId);

  if (err1 || !user) {
    return redirect(302, "/login");
  }

  if (!params.groupId) {
    return fail(400, { invalid: true });
  }
  const { data: data1, error: err2 } = await supabase.rpc("get_image_url", {
    iid: iid,
  });

  const { data: data2, error: err3 } = await supabase.rpc(
    "get_similar_images_in_group_by_image",
    {
      iid: iid,
      gid: gid,
      threshold: 0.2,
      n: 20,
    }
  );

  if (err2) {
    return fail(400, { error: err2.message });
  }

  console.log(data1);
  console.log(data2);

  return {
    refUrl: data1[0].url,
    images: data2,
  };
};
