export const load = async ({ locals: { supabase }, params }) => {
  const { data, error: err6 } = await supabase.rpc("get_group_admins_info", {
    group_id: Number.parseInt(params.groupId),
  });

  if (err6) {
    return { error: err6.message };
  }

  return {
    adminMembers: data,
  };
};
