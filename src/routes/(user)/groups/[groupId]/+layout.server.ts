import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { v4 } from "uuid";
import { getUsername, getGroupname } from "$lib/db/functions/helpers";

export const load = async ({ request, params, locals: { supabase } }) => {

    const { data: user, error: err1 } = await supabase.auth.getUser();

    if (err1 || !user) {
        return redirect(302, "/login");
    }

    if (!params.groupId) {
        return fail(400, { invalid: true });
    }

    const { data, error: err2 } = await supabase.rpc("get_group_posts", {
        gid: Number.parseInt(params.groupId),
    });

    if (err2) {
        return fail(400, { error: err2.message });
    }


    // Fetching Tags
    const { data: tags, error } = await supabase.rpc("get_tags", {
        gid: Number.parseInt(params.groupId),
    });
    console.log(tags);
    console.log("tags got from layout");

    if (error) {
        return { error: error.message };
    }
    // Fetching tags done

    // fetching current members
    const { data: members, error: err4 } = await supabase.rpc("get_group_members_info", {
        group_id: Number.parseInt(params.groupId),
    });
    console.log(members);
    console.log("members got from layout");

    if (err4) {
        return { error: error.message };
    }

    // Post requests and group info 
    const { data: groupInfo, error: err3 } = await supabase.rpc("get_group", {
        group_id: Number.parseInt(params.groupId),
    });
    //console.log("In Load method of Post Requests");
    //console.log(groupInfo);

    const { data: postRequests, error: err5 } = await supabase.rpc("get_requested_posts", {
        group_id: Number.parseInt(params.groupId),
    });
    //console.log("In Load method of Post Requests");
    //console.log(postRequests);

    if (err3) {
        return fail(400, { error: err3.message });
    }
    if (err4) {
        return fail(400, { error: err4.message });
    }

    const { data: requests, error: error_req } = await supabase.rpc("get_requests", {
        gid: Number.parseInt(params.groupId),
    });
    //console.log(data);

    if (error_req) {
        return { error: error_req.message };
    }

    // admin info of the group
    const { data: admin_members, error: err6 } = await supabase.rpc("get_group_admins_info", {
        group_id: Number.parseInt(params.groupId),
    });

    if (err6) {
        return { error: err6 };
    }




    return {
        posts: data,
        tags: tags,
        members: members,
        groupInfo: groupInfo,
        postRequests: postRequests,
        requests: requests,
        admin_members: admin_members,
    };
};
