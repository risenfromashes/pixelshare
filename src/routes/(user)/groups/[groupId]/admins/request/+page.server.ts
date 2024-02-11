import { fail } from "@sveltejs/kit";
import { v4 } from "uuid";

export const actions = {
    default: async ({ request, params, locals: { supabase } }) => {
        const formData = await request.formData();
        console.log("Here is the form data:");
        console.log(formData);
        const username = formData.get("username") as string;
        const action = formData.get("action") as string; // Assuming 'invite' as action for simplicity
        const msg= formData.get("message") as string;

        console.log(action+ "msg:"+ msg);
        if (action === "true") {
            console.log("Sending admin invitation request");
            const { data, error } = await supabase.rpc("send_admin_invitation", {
                group_id: Number.parseInt(params.groupId),
                message: msg,
                user_name: username,
            });

            if (error) {
                console.log(error);
                return fail(400, { error: error.message });
            }
            return { success: true, message: "Admin invitation sent successfully." };
        } else {
            console.log("Unsupported action");
            return fail(400, { error: "Unsupported action" });
        }
    },
};
