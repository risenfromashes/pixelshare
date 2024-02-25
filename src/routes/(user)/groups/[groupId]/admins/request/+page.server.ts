import { fail } from "@sveltejs/kit";
import { v4 } from "uuid";

export const actions = {
    sendRequest: async ({ request, params, locals: { supabase } }) => {
        const formData = await request.formData();
        const username = formData.get("username") as string;
        const isModalOpen = formData.get("isModalOpen") as string;
        const message = formData.get("message") as string;
        const isRequestSent = formData.get("isRequestSent") as string;
        const isCancel = formData.get("isCancel") as string;


        
        // Common formData
        console.log("Action received:", isModalOpen, "Username:", username, "Message:", message, "isRequestSent:", isRequestSent);
        
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
        
        if (isCancel === "true") {
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
    },


};
