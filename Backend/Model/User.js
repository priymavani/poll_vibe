import mongoose from "mongoose";





const userSchema = mongoose.Schema({


    clerkUserId: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profileImage: String,
    UserPoll: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]


})




export const User = mongoose.model("User", userSchema)