import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




const SharePoll = () => {


  return (
    <div className='bg-[#111827] w-screen h-screen flex flex-col justify-center items-center'>


      <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] ">


        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight text-white'>How Was Your Sunday?</h1>
          <h1 className='scroll-m-20 text-xs font-extralight tracking-tight text-white'>By Jenil Savalia</h1>
        </div>


        <div className='my-8'>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2 my-1">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1" className="text-white">Default</Label>
            </div>
            <div className="flex items-center space-x-2 my-1">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2" className="text-white">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2 my-1">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3" className="text-white">Compact</Label>
            </div>
          </RadioGroup>
        </div>



        <div className='my-3 bg-[#565758] h-[1px]'></div>

        <div className='flex space-x-5'>
          <div>
            <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-fit my-2">
              Vote
            </Button>
          </div>

          <div>
            <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-fit my-2">
              Show Result <ArrowRight />
            </Button>
          </div>
        </div>


      </div>

    </div>
  )
}

export default SharePoll