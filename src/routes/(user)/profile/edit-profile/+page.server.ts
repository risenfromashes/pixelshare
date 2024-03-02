import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";

export const actions = {
    default: async ({ request, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const userId=formData.get("userId") as string;
        const username = formData.get("username") as string;
        const location = formData.get("location") as string;
        const bio= formData.get("bio") as string;
        const phonenumber= formData.get("phonenumber") as string;
        const imgs= formData.getAll("profileImg") as File[];
        const faceImgs=formData.getAll("faceImg") as File[];


        
        console.log("Action received:",username, "img:", imgs);
        const {
			data: { user },
			error: err1,
		} = await supabase.auth.getUser();

		if (err1 || !user) {
			return redirect(302, "/login");
		}

		const session = await getSession();
		if (!session) {
			return redirect(302, "/login");
		}


        if (!imgs || imgs.length === 0) {
            return fail(400, { invalid: true });
        }

        let paths = [];
        for (const img of imgs) {
            const { data, error } = await supabase.storage
                .from("images")
                .upload(v4() + "." + img.name.split(".").pop(), img);

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



        //add face image
        if (!faceImgs || faceImgs.length === 0) {
            return fail(400, { invalid: true });
        }

        let facePaths = [];
        for (const img of faceImgs) {
            const { data, error } = await supabase.storage
                .from("images")
                .upload(v4() + "." + img.name.split(".").pop(), img);

            if (error) {
                await supabase.storage.from("images").remove(facePaths);
                return fail(400, { error: "Storage error: " + error.message });
            } else {
                facePaths.push(data.path);
            }
        }

        const faceurls = facePaths.map((facePaths) => {
            return supabase.storage.from("images").getPublicUrl(facePaths).data.publicUrl;
        });

        
        // Common formData
       console.log("Action received:",username, "urls:", faceurls[0]);

       const { data, error } = await supabase.rpc("edit_profile", {
        user_id:userId,
        user_name:username,
        bio2:bio,
        location2:location,
        phone_number:phonenumber,
        img:urls[0],
        face:faceurls[0],
    });

    if (error) {
        console.log("Error editing profile", error);
        return fail(400, { error: error.message });
    }

        
            // return redirect(302, "/profile");
            return { success: true };

        // }

    },


};
