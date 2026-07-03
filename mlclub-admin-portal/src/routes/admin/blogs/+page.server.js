import { connectDB } from "$lib/server/db";
import Blog from "$lib/server/models/Blogs";
import {fail, redirect} from "@sveltejs/kit";

export async function load(){

    await connectDB();

    const blogs = await Blog.find().lean();

    return{
        blogs:JSON.parse(JSON.stringify(blogs))
    };
}   

export const actions={

    addBlog:async({request})=>{

        await connectDB();

        const data=await request.formData();

        await Blog.create({

            title:data.get("title"),
            content:data.get("content")

        });

        throw redirect(303,"/admin/blogs");
    },

    updateBlog:async({request})=>{

        await connectDB();

        const data=await request.formData();

        await Blog.findByIdAndUpdate(

            data.get("id"),

            {

                title:data.get("title"),
                content:data.get("content")

            }

        );

        throw redirect(303,"/admin/blogs");
    },

    deleteBlog:async({request})=>{

        await connectDB();

        const data=await request.formData();

        await Blog.findByIdAndDelete(data.get("id"));

        throw redirect(303,"/admin/blogs");
    }

};