import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const actions = {
    default: async ({ request, params, locals: { supabase } }) => {
        const formData = await request.formData();
        const files = formData.getAll("files") as File[];
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        console.log("Action called");
        console.log(name);

        const {
            data: { user },
            error: err1,
        } = await supabase.auth.getUser();

        if (err1 || !user) {
            return redirect(302, "/login");
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

        const { data, error } = await supabase.rpc("add_group", {
            name: name,
            createdBy: user.id,
            description: description,
            createdAt: date,
            coverImg: urls[0],
            profileImg: urls[1],
        });

        if (error) {
            console.log(error);
            await supabase.storage.from("images").remove(paths);
            return fail(400, { error: error.message });
        }

        const username = await getUsername(supabase, user.id);


        return { success: true };
    },
};



