import mongoose from "mongoose";


const pollSchema = mongoose.Schema({

    poll_details: {
        poll_title: { type: String, required: true },
        poll_options: [{ type: String, required: true }],
    },

    poll_settings: {
        oneVotePerIP: { type: Boolean, required: true, default: true },
        allowMultipleSelection: { type: Boolean, required: true, default: false },
        requireParticipantName: { type: Boolean, required: true, default: false },
        allowComments: { type: Boolean, required: true, default: false },
        resultVisibility: { type: String, enum: ["Always Public", "Public after end Date", "Public after Vote", "Not Public"], required: true, default: "Always Public" },
        closePollOnScheduleTime: { type: Boolean, required: true, default: false }
    },

    poll_result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    },

    Created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

}, { timestamps: true })




export const PollDetail = mongoose.model("Poll", pollSchema)