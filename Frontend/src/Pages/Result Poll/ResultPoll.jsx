import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axois from 'axios'
import { useParams,Link } from "react-router-dom";



const ResultPoll = () => {

  const [Result, setResult] = useState();
  const [PollData, setPollData] = useState();
  const [Sum, setSum] = useState();
  const { poll_id } = useParams()

  const GetPollResult = async () => {

    try {
      const PollResult = await axois.get(`http://localhost:8090/vote/result/${poll_id}`)
      setResult(PollResult.data.Result)
      console.log(PollResult.data.Result)
      let sum = Object.values(PollResult.data.Result).reduce((acc, value) => acc + value, 0)
      setSum(sum)
    } catch (err) {
      console.log("Error :", err.message)
    }
  }


  const getPollData = async () => {

    try {
      const response = await axois.get(`http://localhost:8090/poll/${poll_id}`)
      setPollData(response.data.PollData)
      console.log(response.data.PollData)
    } catch (err) {
      console.log("Error :", err.message)
    }

  }

  useEffect(() => {
    GetPollResult()
    getPollData()
  }, [])

  return (
    <div className='bg-[#111827] w-screen h-screen flex flex-col justify-center items-center'>


      <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] ">


        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight text-white'>{PollData?.poll_details.poll_title}</h1>
          <h1 className='scroll-m-20 text-xs font-extralight tracking-tight text-white'>By {PollData?.Created_by[0]}</h1>
        </div>

        <div className='my-3 bg-[#565758] h-[1px]'></div>

        <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white mb-5'>Total Votes : {Sum}</h1>


        {Result && typeof Result === "object" ? (
          Object.entries(Result).map(([key, value]) => (
            <h1 key={key} className='text-white'>
              {key} : {value}
            </h1>
          ))
        ) : (
          <p className='text-red-500'>No valid data</p>
        )}





        <div className='my-3 bg-[#565758] h-[1px]'></div>

        <div className='flex space-x-5'>

          <div>
            <Link to={`/poll/${poll_id}`}>       
            <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-fit my-2">
              <ArrowLeft />Back to Poll
            </Button>
            </Link>
          </div>
        </div>


      </div>

    </div>
  )
}

export default ResultPoll