import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";

export const actions = {
    default: async ({ request, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const isEdit = formData.get("isEdited") as string;
        const userId = formData.get("userId") as string;
        const bio= formData.get("editedBio") as string;

        

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

        
        // Common formData
       console.log("Action received:", "bio:", bio);
        
            return { success: true };
        // }

    },


};
