import {redirect} from "@sveltejs/kit";

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete("token", {
			path: "/"
		});

		throw redirect(303, "/auth");
	}, 
    cancel: async() => {
        throw redirect(303, "/admin/dashboard");
    }
};