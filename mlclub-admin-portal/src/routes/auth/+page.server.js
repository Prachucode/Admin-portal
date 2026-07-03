import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connectDB } from "$lib/server/db.js";
import {Admin} from "$lib/server/models/Admin.js";
import { JWT_SECRET } from "$env/static/private";

export const actions = {
    default: async ({ request, cookies }) => {
        await connectDB();

        const data = await request.formData();

        const email = data.get("email");
        const password = data.get("password");
       
        // Find Admin
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return fail(401, {
                error: "Invalid UserID or Password"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return fail(401, {
                error: "Invalid UserID or Password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Store Cookie
        cookies.set("token", token, {
            path: "/",
            httpOnly: true,
            secure: false, // change to true after deployment with HTTPS
            sameSite: "strict",
            maxAge: 60 * 60 * 24
        });
        console.log("working")
        throw redirect(302, "/admin/dashboard");
    }
};