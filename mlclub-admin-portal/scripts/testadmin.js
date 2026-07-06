import bcrypt from "bcrypt";
import { connectDB } from "../src/lib/server/db.js";
import { Admin } from "../src/lib/server/models/Admin.js";

await connectDB()

const hashedpassword = await bcrypt.hash('1234', 10)


await Admin.create({
	email: "test@user.com",
	password: hashedpassword
});
console.log("Test admin created successfully");
process.exit(0);