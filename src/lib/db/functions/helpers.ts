import type { SupabaseClient } from "@supabase/supabase-js";

export const getUsername = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from("User")
    .select("username")
    .eq("id", id);
  return data ? data[0].username : null;
};

export const getGroupname = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from("Group")
    .select("name")
    .eq("id", id);
  return data ? data[0].name : null;
};
