import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

export const load = async ({ cookies }) => {
	const token = cookies.get("token");

	if (!token) {
		throw redirect(302, "/auth");
	}

	try {
		const admin = jwt.verify(token, JWT_SECRET);

		return {
			admin
		};
	} catch {
		throw redirect(302, "/auth");
	}
}

