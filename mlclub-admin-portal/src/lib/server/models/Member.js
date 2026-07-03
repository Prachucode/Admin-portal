import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            default: ""
        },// to be uploaded

        name: {
            type: String,
            required: true
        },
        year:{
            type: String,
            required: true
        },
        team: {
            type: String,  
            required: true
        },

        position: {
            type: String,
            required: true
        },

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

    },
    {
        timestamps: true
    }
);

export default mongoose.models.Member ||
    mongoose.model("Member", memberSchema);