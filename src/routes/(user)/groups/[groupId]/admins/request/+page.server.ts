import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";

export const actions = {
    default: async ({ request, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const username = formData.get("username") as string;
        const isModalOpen = formData.get("isModalOpen") as string;
        const message = formData.get("message") as string;
        const isRequestSent = formData.get("isRequestSent") as string;
        const isCancel = formData.get("isCancel") as string;

        //second form data
        const userId = formData.get("userId") as string;
        const resign = formData.get("resign") as string;

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
        console.log("Action received:", isModalOpen, "Username:", username, "Message:", message, "isRequestSent:", isRequestSent);
        // console.log(session.user.id);
        // Process based on action
        const date= new Date();
        if (isRequestSent === "true") {
            console.log("group_id:", Number.parseInt(params.groupId), "message:", message, "sent_time:", date, "user_name:", username);
            console.log("Sending admin invitation request to:", username, "Message:", message);

            const { data, error } = await supabase.rpc("add_admin_moderation", {
                group_id:  Number.parseInt(params.groupId),
                message: message,
                sent_time: date,
                user_name: username, 
            });

            if (error) {
                console.log("Error sending admin invitation:", error);
                return fail(400, { error: error.message });
            }

            return { success: true, message: "Admin invitation sent successfully." };
        }
        
        else if (isCancel === "true") {
            console.log("group_id:", Number.parseInt(params.groupId), "user_name:", username);
            console.log("Cancelling admin invitation request to:", username);

            const { data, error } = await supabase.rpc("cancel_admin_moderation", {
                group_id:  Number.parseInt(params.groupId),
                user_id: username, 
            });

            if (error) {
                console.log("Error cancelling admin invitation:", error);
                return fail(400, { error: error.message });
            }

            return { success: true, message: "Admin invitation cancelled successfully." };
        }

        else if (resign === "true") {
            console.log("group_id:", Number.parseInt(params.groupId), "user_name:", username);
            console.log("Resigning as admin:", userId);

            const { data, error } = await supabase.rpc("resign_admin ", {
                group_id:  Number.parseInt(params.groupId),
                user_id: userId, 
            });

            if (error) {
                console.log("Error resigning as admin:", error);
                return fail(400, { error: error.message });
            }

            return { success: true };
        }


        return { success: true };

    },


};
