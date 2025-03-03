import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




const ResultPoll = () => {


  return (
    <div className='bg-[#111827] w-screen h-screen flex flex-col justify-center items-center'>


      <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] ">


        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight text-white'>How Was Your Sunday?</h1>
          <h1 className='scroll-m-20 text-xs font-extralight tracking-tight text-white'>By Jenil Savalia</h1>
        </div>

        <div className='my-3 bg-[#565758] h-[1px]'></div>

        <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white'>Total Votes :</h1>
        <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white'>Option 1 :</h1>
        <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white'>Option 2 :</h1>
        <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white'>Option 3 :</h1>
        <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white'>Option 4 :</h1>



        <div className='my-3 bg-[#565758] h-[1px]'></div>

        <div className='flex space-x-5'>

          <div>
            <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-fit my-2">
              <ArrowLeft />Back to Poll
            </Button>
          </div>
        </div>


      </div>

    </div>
  )
}

export default ResultPoll