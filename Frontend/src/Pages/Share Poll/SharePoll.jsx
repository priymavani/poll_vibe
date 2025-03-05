import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle, Share2, BarChart2 } from "lucide-react";
import { CircleAlert } from 'lucide-react';
import ShareComponent from './ShareComponent'



const SharePoll = () => {


  const [PollData, setPollData] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [PostData, setPostData] = useState("")

  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (PostData === "Vote Submitted Successfully!") {
      setOpen(true);
    }
  }, [PostData]);


  const { poll_id } = useParams()

  const getPollData = async () => {

    try {
      const response = await axios.get(`http://localhost:8090/poll/${poll_id}`)
      setPollData(response.data.PollData)
    } catch (err) {
      console.log("Error :", err.message)
    }

  }

  const HandleVote = async () => {
    await PostPollVote();
  };

  const PostPollVote = async () => {
    try {
      const PostVote = await axios.post("http://localhost:8090/vote", {
        poll_id: PollData?._id,
        selected_option: selectedOption,
        VotePerIP: PollData?.poll_details?.oneVotePerIP,
      });

      setPostData(PostVote.data?.error || "Vote Submitted Successfully!"); // Handle missing error field
    } catch (err) {
      console.log("Error:", err.message);
      setPostData("Failed to submit vote");
    }
  };


  useEffect(() => {
    getPollData()
  }, [])

  return (

    <>

      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className=" bg-[#111827] text-white rounded-lg">
            <DialogHeader>
              <div className="flex flex-col items-center">
                <CheckCircle className="text-green-500 w-10 h-10 mb-2" />
                <DialogTitle className="text-lg font-semibold">Vote Successful</DialogTitle>
                <DialogDescription className="text-sm text-gray-400 text-center">
                  Thank you for participating in this poll. Your vote has been counted.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="flex justify-between mt-4">
              <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] flex items-center space-x-2">
                <BarChart2 className="w-4 h-4" />
                <span>Results</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>


      <div className='bg-[#111827] w-screen h-screen flex flex-col justify-start pt-72 items-center'>


        <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] ">

    
          <div>
            <h1 className='scroll-m-20 text-xl font-semibold tracking-tight text-white'>{PollData?.poll_details.poll_title}</h1>
            <h1 className='scroll-m-20 text-xs font-extralight tracking-tight text-white'>By {PollData?.Created_by[0]}</h1>
          </div>


          <div className='my-8'>


            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {PollData?.poll_details.poll_options.map((option, index) => (
                <div key={option} className="flex items-center space-x-2 my-1">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-white">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>


          </div>



          <div className='my-3 bg-[#565758] h-[1px]'></div>

          <div className='flex space-x-5 items-center'>
            <div className=''>

              <Button
                className={`bg-[#8E51FF] hover:bg-[#8e51ffbb] w-fit my-2 ${selectedOption ? "cursor-pointer" : "cursor-not-allowed"}`}
                disabled={!selectedOption}
                onClick={HandleVote}
              >
                Vote
              </Button>



            </div>

            <div>
              <Link to={`/poll/${poll_id}/result`}>
                <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-fit my-2">
                  Show Result <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>

          {
            PostData === "You have already voted!" ? (
              <div className='bg-[#362937] p-3 mt-2 rounded-md' >
                <Label className="text-white text-xs pb-1"><CircleAlert width={18} />{PostData}</Label>
              </div>) : (null)
          }

        </div>

      </div >

      <div className="absolute bottom-30 w-full z-50">
        <ShareComponent />
      </div>

    </>
  )
}

export default SharePoll