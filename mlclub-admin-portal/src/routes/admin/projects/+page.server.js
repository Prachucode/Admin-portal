import { connectDB } from "$lib/server/db";
import Project from "$lib/server/models/Projects";
import {fail, redirect} from "@sveltejs/kit";

export async function load(){

    await connectDB();

    const projects = await Project.find().lean();

    return{
        projects:JSON.parse(JSON.stringify(projects))
    };
}

export const actions={

    addProject:async({request})=>{

        await connectDB();

        const data=await request.formData();

        await Project.create({

            title:data.get("title"),
            description:data.get("description"),
            github:data.get("github"),
            URL:data.get("URL")

        });

        throw redirect(303,"/admin/projects");
    },

    updateProject:async({request})=>{

        await connectDB();

        const data=await request.formData();

        await Project.findByIdAndUpdate(
            data.get("id"),
            {

                title:data.get("title"),
                description:data.get("description"),
                github:data.get("github"),
                URL:data.get("URL")

            }
        );

        throw redirect(303,"/admin/projects");
    },

    deleteProject:async({request})=>{

        await connectDB();

        const data=await request.formData();

        await Project.findByIdAndDelete(data.get("id"));

        throw redirect(303,"/admin/projects");
    }

};