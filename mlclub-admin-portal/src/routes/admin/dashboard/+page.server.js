import { connectDB } from "$lib/server/db.js";
import Member from "$lib/server/models/Member.js";
import Project from "$lib/server/models/Projects";
import Blog from "$lib/server/models/Blogs";
import mongoose from "mongoose";
export async function load() {

	await connectDB();
	console.log("Database:", mongoose.connection.name);
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