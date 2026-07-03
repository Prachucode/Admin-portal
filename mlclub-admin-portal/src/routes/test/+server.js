import { connectDB } from "$lib/server/db.js";

export async function GET() {
    await connectDB();

    return new Response("MongoDB Connected");
}