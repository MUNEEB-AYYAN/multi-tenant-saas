import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    }
    },{ timestamps: true })

export default mongoose.model("Task", taskSchema)
