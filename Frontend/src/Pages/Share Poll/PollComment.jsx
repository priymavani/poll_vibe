import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Toaster, toast } from "sonner";
import { User } from 'lucide-react';

const PollComment = ({ pollid }) => {
    console.log(pollid);

    // State for Participant Name
    const [participantName, setParticipantName] = useState("");

    // State for Text Area
    const [textArea, setTextArea] = useState("");

    // State for Comment Data
    const [myComments, setMyComments] = useState([]);

    // Fetch comments on component mount or when pollid changes
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/vote/comment/${pollid}`);
                if (response.status === 200) {
                    setMyComments(response.data.Comments); // Assuming the comments are in response.data.Comments
                    console.log(response.data.Comments);
                }
            } catch (err) {
                console.log("Error:", err.message);
            }
        };

        fetchComments();
    }, [pollid]);

    // Handle comment submission
    const handleCommentSubmit = async () => {
        try {
            const response = await PostComment();
            if (response === "Comment Saved") {
                // Clear input fields
                setParticipantName("");
                setTextArea("");

                // Fetch updated comments
                const updatedResponse = await axios.get(`http://localhost:8008/vote/comment/${pollid}`);
                if (updatedResponse.status === 200) {
                    setMyComments(updatedResponse.data.Comments);
                }

                toast("Comment Saved!");
            }
        } catch (err) {
            console.log("Error:", err.message);
            toast("Failed to save comment.");
        }
    };

    // Post a new comment
    const PostComment = async () => {
        try {
            const comment = await axios.post("http://localhost:8008/vote/comment", {
                poll_id: pollid,
                Comment: {
                    name: participantName,
                    commentMatter: textArea,
                },
            });
            return comment?.data?.Status;
        } catch (err) {
            console.log("Error:", err.message);
            throw err; // Re-throw the error to handle it in handleCommentSubmit
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center mb-7'>
                <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] text-white">
                    <h2 className="text-lg font-semibold">Comment</h2>

                    <div className='pt-5'>
                        <Label className="text-[#71717B] text-xs pb-1">Participant Name</Label>
                        <Input
                            type="text"
                            placeholder="Name is Required*"
                            className='p-3 text-white bg-[#2A3441] border-[#4e5155] text-sm w-2xs'
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                        />
                    </div>

                    <div className="grid w-full gap-1.5 mt-3">
                        <Textarea
                            placeholder="Type your message here."
                            id="message"
                            value={textArea}
                            onChange={(e) => setTextArea(e.target.value)}
                        />
                    </div>

                    <Button
                        className={`bg-[#8E51FF] hover:bg-[#8e51ffbb] w-fit my-2`}
                        disabled={!participantName || !textArea}
                        onClick={handleCommentSubmit}
                    >
                        Comment
                    </Button>

                    <Toaster />

                    {myComments?.map((item) => (
                        <div key={item._id} className='bg-[#2b3646] rounded-sm p-3 opacity-85 my-2'>
                            <h1 className='mb-1 flex items-center space-x-1'>
                                <User size={15} />
                                <span>{item.name}</span>
                            </h1>
                            <p className='bg-[#222a36] p-2 rounded-sm opacity-50 text-sm'>{item.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PollComment;