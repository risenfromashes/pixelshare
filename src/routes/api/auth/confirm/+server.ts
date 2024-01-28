import { redirect } from "@sveltejs/kit";

export const GET = async (event) => {
  const {
    url,
    locals: { supabase },
  } = event;
  const token_hash = url.searchParams.get("token_hash") as string;
  const type = url.searchParams.get("type") as
    | "email"
    | "recovery"
    | "magiclink";
  const next = url.searchParams.get("next") ?? "/";
  let query = new URLSearchParams();

  if (type && token_hash) {
    const {
      data: { user },
      error,
    } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!error && user) {
      // insert user into database
      if (type == "email") {
        const { error } = await supabase.from("User").insert({
          id: user.id,
          email: user.email,
          username: user.email?.split("@")[0],
          joiningDate: new Date(),
        });

        if (error) {
          query.set("error", error.message);
          throw redirect(303, `/auth/error?${query.toString()}`);
        }
      }

      throw redirect(303, `/${next.slice(1)}`);
    }

    query.set("error", error?.message ?? "Unknown error.");
  } else {
    query.set("error", "Invalid token or token expired.");
  }

  // return the user to an error page with some instructions
  throw redirect(303, `/auth/error?${query.toString()}`);
};
