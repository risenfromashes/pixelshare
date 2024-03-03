import { fail } from "@sveltejs/kit";

export const load = async ({ params, locals: { supabase } }) => {
  if (!params.groupId) {
    return fail(400, { error: "No group id provided" });
  }

  const { data, error } = await supabase.rpc("get_tags_in_group", {
    gid: params.groupId,
  });

  if (error) {
    return fail(500, { error: error.message });
  }

  return {
    tags: data,
  };
};
