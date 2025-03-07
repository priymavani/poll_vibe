import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { Toaster, toast } from "sonner";
import { User } from 'lucide-react';


const PollComment = ({ pollid }) => {

    console.log(pollid)
    // State for Participant Name
    const [participantName, setparticipantName] = useState("");

    // State for Text Area
    const [TextArea, setTextArea] = useState("");


    const handleCommentSubmit = async () => {

        const response = await PostComment()
        if (response === "Comment Saved") {
            setparticipantName("")
            setTextArea("")
            setMyComments({

            })
            toast("Comment Saved!")
        }
    }


    const PostComment = async () => {

        try {
            const comment = await axios.post("http://localhost:8090/vote/comment", {
                "poll_id": pollid,
                "Comment": {
                    "name": participantName,
                    "commentMatter": TextArea
                }
            })
            return (comment?.data?.Status)
        } catch (err) {
            console.log("Error :", err.message)
        }

    }

    return (

        <>

            <div className='flex flex-col justify-center items-center'>

                <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] text-white ">

                    <h2 className="text-lg font-semibold">Comment</h2>

                    <div className='pt-5'>
                        <Label className="text-[#71717B] text-xs pb-1">Participant Name</Label>
                        <Input
                            type="text"
                            placeholder="Name is Required*"
                            className='p-3 text-white bg-[#2A3441] border-[#4e5155] text-sm w-2xs'
                            value={participantName}
                            onChange={(e) => setparticipantName(e.target.value)}
                        />
                    </div>

                    <div className="grid w-full gap-1.5 mt-3">
                        {/* <Label htmlFor="message">Your message</Label> */}
                        <Textarea placeholder="Type your message here." id="message" value={TextArea} onChange={(e) => setTextArea(e.target.value)} />
                    </div>

                    <Button
                        className={`bg-[#8E51FF] hover:bg-[#8e51ffbb] w-fit my-2`}
                        // disabled={!selectedOption}
                        onClick={handleCommentSubmit}
                    >
                        Comment
                    </Button>

                    <div>
                        <Toaster />
                    </div>

                    <div className='bg-[#2b3646] rounded-sm p-3 opacity-75 my-2'>
                        <h1 className='mb-1 flex items-center space-x-1'>
                            <User size={15} />
                            <span>
                                Jenil Savalia
                            </span>
                        </h1>
                        <p className='bg-[#222a36] p-2 rounded-sm opacity-50 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sunt nostrum molestias quidem corrupti, neque sequi error repellat laudantium laboriosam voluptatibus odio aliquid dolore tenetur id cupiditate! Aspernatur doloremque laudantium veniam, officia quidem quasi veritatis nam iusto dolore mollitia vitae cupiditate deleniti, voluptatibus provident? Vel adipisci cumque consequuntur blanditiis atque!</p>
                    </div>


                </div>


            </div>

        </>

    )
}

export default PollComment