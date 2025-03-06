import { PollResult } from "./Model/PollResult.js"
import { PollDetail } from "./Model/PollDetail.js"
import { User } from "./Model/User.js"
import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express()


app.use(express.json())
app.use(cors())

const PORT = 8090;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/", {
            dbName: "Hello_Poll"
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

connectDB();



// Create a new poll
app.post('/poll', async (req, res) => {

    const { poll_details, Created_by, endDate, poll_settings } = req.body;

    if (!poll_details || !Created_by || !poll_details.poll_options || !endDate || !poll_settings) {
        return res.status(400).json({ error: 'poll_details and Created_by are required, and poll_details must contain poll_options' });
    }

    try {
        const NewPoll = new PollDetail({ endDate, poll_details, poll_settings, Created_by });
        await NewPoll.save();


        await User.updateOne(
            { _id: NewPoll.Created_by },
            { $addToSet: { UserPoll: NewPoll._id } }
        )


        // Initialize selected_options with poll_options, setting each option's count to 0
        const initialOptions = NewPoll.poll_details.poll_options.reduce((acc, option) => {
            acc[option] = 0;
            return acc;
        }, {});



        await PollResult.create({
            poll_id: NewPoll._id,
            selected_options: initialOptions
        })


        res.json({ PollId: NewPoll._id })
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }

})


// Get poll informtion
app.get('/poll/:poll_id', async (req, res) => {

    const { poll_id } = req.params;

    try {
        const findPoll = await PollDetail.findById(poll_id)

        if (!findPoll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        const now = new Date();
        const endDate = new Date(findPoll.endDate);
        console.log(new Date().toISOString());


        if (now > endDate) {
            // If endDate has passed, update poll_status to false
            findPoll.poll_status = false;
            await findPoll.save();

            return res.status(400).json({ error: 'This poll has ended.' });
        }

        res.json({ PollData: findPoll })
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }

})




// Post the vote for multiple Choice Question
app.post('/vote', async (req, res) => {

    const { poll_id, selected_option, VotePerIP, ParticipantName } = req.body;
    const voted_ip = req.ip;



    if (!poll_id || !selected_option) {
        return res.status(400).json({ error: 'poll_id and selected_option are required' });
    }

    // Convert VotePerIP to a boolean
    const allowMultipleVotes = VotePerIP === "false" ? false : true;


    try {

        let result = await PollResult.findOne({ poll_id });

        if (!result) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        // Use atomic operations to update the poll result
        let updatedResult;

        if (!allowMultipleVotes) {
            // If multiple votes are allowed, skip the IP check and increment the vote count
            updatedResult = await PollResult.findOneAndUpdate(
                { poll_id }, // No IP check
                {
                    $inc: selected_option.reduce((acc, option) => {
                        acc[`selected_options.${option}`] = 1; // Increment each selected option
                        return acc;
                    }, {}), // Initialize accumulator as an empty object
                    $push: {
                        voted_ips: voted_ip, // Add the voter's IP
                        participants: { // Add participant name if provided
                            name: ParticipantName,
                            selectedOptions: selected_option, // Store array of selected options
                        },
                    },
                },
                { new: true } // Return the updated document
            );
        } else {
            // If multiple votes are not allowed, enforce one vote per IP
            updatedResult = await PollResult.findOneAndUpdate(
                { poll_id, voted_ips: { $ne: voted_ip } }, // Ensure the IP hasn't voted
                {
                    $inc: selected_option.reduce((acc, option) => {
                        acc[`selected_options.${option}`] = 1; // Increment each selected option
                        return acc;
                    }, {}), // Initialize accumulator as an empty object
                    $push: {
                        voted_ips: voted_ip, // Add the voter's IP
                        participants: { // Add participant name if provided
                            name: ParticipantName,
                            selectedOptions: selected_option, // Store array of selected options
                        },
                    },
                },
                { new: true } // Return the updated document
            );

            // If no document was updated, it means the IP has already voted
            if (!updatedResult) {
                return res.json({ error: 'You have already voted!' });
            }
        }


        // Return the updated poll result
        return res.json({ PollResult: updatedResult });
    } catch (err) {
        console.error('Error in /vote:', err);
        return res.status(500).json({ error: 'An error occurred while processing your vote' });
    }
});



// Post Comment
app.post('/vote/comment', async (req, res) => {

    const { poll_id, Comment } = req.body;

    if (!poll_id) {
        return res.status(400).json({ error: 'poll_id and selected_option are required' });
    }


    try {
        let PostComment = await PollResult.findOne({ poll_id });

        PostComment.comments.push({
            name: Comment.name,
            comment: Comment.commentMatter
        })

        await PostComment.save()

        console.log("Comment Saved", PostComment)
        return res.json({ Status: "Comment Saved" })

    } catch (err) {
        console.error('Error in posting Comment:', err);
        return res.status(500).json({ error: 'An error occurred while processing your Comment' });
    }

})



// get Poll Result By poll_id
app.get("/vote/result/:Poll_id", async (req, res) => {

    const { Poll_id } = req.params;

    try {

        const Resposes = await PollResult.findOne({ poll_id: Poll_id })
        if (!Resposes) {
            return res.status(404).json({ Error: "Poll Not Found" })
        }

        return res.status(201).json({ Result: Resposes.selected_options })

    } catch (err) {
        return res.status(500).json({ Error: err.message })
    }

})



app.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`)
})