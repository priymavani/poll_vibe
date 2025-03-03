import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { PollTypeDropdown } from './PollTypeDropdown';





const CreatePoll = () => {

  const [isChecked, setIsChecked] = useState(true)



  const [options, setOptions] = useState([
    {
      id: 1,
      placeholder: "Option 1",
      value: ""
    },
    {
      id: 2,
      placeholder: "Option 2",
      value: ""
    },
  ])

  console.log(options)


  const handleAddOption = () => {

    setOptions([...options, {
      id: options[options.length - 1].id + 1,
      placeholder: `Option ${options[options.length - 1].id + 1}`,
      value: ""
    }])
  }

  const handleChange = (changedValue, id) => {

    setOptions((prevOptions) => prevOptions.map((opt) =>
      opt.id == id ? { ...opt, value: changedValue } : opt
    ))

  }


  const handleRemoveOption = (id) => {
    setOptions(
      options.filter((opt) => opt.id != id)
    )
  }

  return (
    <div className='bg-[#111827] w-screen h-screen flex flex-col justify-center items-center'>


      <div className='mb-8'>
        <h1 className='text-white text-2xl font-medium text-center'>Create a Vibe Poll</h1>
        <h1 className='text-xs font-extralight text-gray-400 text-center'>Complete the below fields to create your poll.</h1>
      </div>

      <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] ">

        {/* Poll Title */}
        <div className='mb-8'>
          <Label className="text-white text-xs pb-1">Poll Title</Label>
          <Input type="input" placeholder="Poll Title" className='p-3 text-white bg-[#2A3441] border-[#4e5155] text-sm' />
        </div>

        {/* Poll Options */}
        {/* - Multiple Choice , Image Poll  */}

        <div className='pb-6'>
          <Label className="text-white text-xs pb-1">Poll Type</Label>
          <div className="flex items-center">
            <PollTypeDropdown />
          </div>
        </div>


        <div className='mb-8'>
          <Label className="text-white text-xs pb-1">Poll Options</Label>
          {
            options.map((item) => (
              <div className="relative w-full" key={item.id}>
                <Input
                  value={item.value}
                  onChange={(e) => {
                    handleChange(e.target.value, item.id)
                  }
                  }
                  placeholder={item.placeholder}
                  className="pr-10 p-3 text-white bg-[#2A3441] border-[#4e5155] text-sm mb-2.5"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => handleRemoveOption(item.id)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          }

          <Button className="cursor-pointer text-xs p-1 bg-[#2A3441] text-white hover:bg-[#d4d4d5] " variant={"outline"} size={"custom"} onClick={handleAddOption}>
            <Plus />Add Option
          </Button>


        </div>


        <Label className="text-white text-xs pb-1">Poll Settings</Label>

        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" onChange={setIsChecked} checked={isChecked} />
          <Label htmlFor="airplane-mode" className="text-white">One Vote Per IP</Label>
        </div>

        <div className='my-3 bg-[#565758] h-[1px]'></div>


        <div>
          <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-full my-2">
            Create Poll
          </Button>
        </div>


      </div>

    </div>
  )
}

export default CreatePoll