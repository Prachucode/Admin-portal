import { connectDB } from "$lib/server/db.js";
import Member from "$lib/server/models/Member.js";
import Project from "$lib/server/models/Projects";
import Blog from "$lib/server/models/Blogs";

export async function load() {

	await connectDB();

	const [
		members,
        projects,
        blogs
	] = await Promise.all([

		Member.countDocuments(),
		Project.countDocuments(),
		Blog.countDocuments(),

	]);

	return {

		members,
        projects,
        blogs

	};

}