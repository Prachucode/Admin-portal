import { connectDB } from "$lib/server/db";
import Member from "$lib/server/models/Member";
import cloudinary from "$lib/server/cloudinary";
import streamifier from "streamifier";
import {fail, redirect} from "@sveltejs/kit";
export async function load() {

    await connectDB();

    const members = await Member.find().lean();

    return {
        members: JSON.parse(JSON.stringify(members))
    };

}


export const actions = {
	addMember: async ({ request }) => {
		await connectDB();

		const data = await request.formData();

		const name = data.get("name");
        const year = data.get("year");
        const team = data.get("team");
		const position = data.get("position");
		const github = data.get("github");
		const linkedin = data.get("linkedin");
		const file = data.get("photo");

let photoUrl = "";

if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());

    photoUrl = await new Promise((resolve, reject) => {

        const upload = cloudinary.uploader.upload_stream(
            {
                folder: "mlclub-members"
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );

        streamifier.createReadStream(buffer).pipe(upload);

    });
}
		if (!name || !position || !year || !team) {
			return fail(400, {
				error: "Please fill all required fields."
			});
		}

		await Member.create({
			name,
			position,
			year,
			team,
			github,
			linkedin,
			photo: photoUrl
		});

        throw redirect(303, "/admin/members");
		
	},
    	deleteMember: async ({ request }) => {
		await connectDB();

		const data = await request.formData();

		const id = data.get("id");

		await Member.findByIdAndDelete(id);

		throw redirect(303, "/admin/members");
	},

	updateMember: async ({ request }) => {
	await connectDB();

	const data = await request.formData();
	const file = data.get("photo");
	let photoUrl = ""

if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());

    photoUrl = await new Promise((resolve, reject) => {

        const upload = cloudinary.uploader.upload_stream(
            {
                folder: "mlclub-members"
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );

        streamifier.createReadStream(buffer).pipe(upload);

    });
}
	await Member.findByIdAndUpdate(data.get("id"), {
		name: data.get("name"),
		year: data.get("year"),
		team: data.get("team"),
		position: data.get("position"),
		github: data.get("github"),
		linkedin: data.get("linkedin"),
		photo: photoUrl
	});

	throw redirect(303, "/admin/members");
}
};