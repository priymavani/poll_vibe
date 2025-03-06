import mongoose from "mongoose";





const pollResultSchema = mongoose.Schema({

    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    },

    selected_options: { type: Object, default: {} }, // Object to store option counts
    voted_ips: [{ type: String, required: true, default: [] }],

    comments: [{
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Poll"
        },
        name: { type: String, required: true },
        comment: { type: String, required: true }
    }],

    participantName: [{
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Poll"
        },
        EnteredName: { type: String, required: true },
        SelectedOption: [{ type: String, required: true }]
    }]

}, { timestamps: true })




export const PollResult = mongoose.model("Result", pollResultSchema)