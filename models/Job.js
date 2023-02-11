import mongoose from "mongoose";

// Job-Modell
const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company"],
        maxlength: 20,
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
        maxlength: 100,
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "remote", "internship"],
        default: "full-time",
    },
    jobLocation: {
        type: String,
        default: "my city",
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"]
    }
},
    { timestamps: true }
);

export default mongoose.model("Job", JobSchema);