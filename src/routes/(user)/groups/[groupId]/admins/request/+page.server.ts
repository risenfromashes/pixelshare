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

        //resignation
        const userId = formData.get("userId") as string;
        const resign= formData.get("resign") as string;
       

        console.log(action+ "msg:"+ msg);
        console.log("username:"+ username);
        console.log("resign ki hoy? "+userId+ " "+resign    );
        const time= new Date();
        if (action === "true") {
            console.log("Sending admin invitation request");
            const { data, error } = await supabase.rpc("send_admin_invitation", {
                group_id: params.groupId,
                message: msg,
                user_name: username,
                sent_time: time,
                status: "pending",
            });

        if (resign === "true") 
        {
            console.log("Sending resignation request");
            const { data, error } = await supabase.rpc("remove_admin", {
                group_id: params.groupId,
                user_id: userId,
            });
        }

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
