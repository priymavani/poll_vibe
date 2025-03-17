import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { PollTypeDropdown } from './PollTypeDropdown';
import { GenericDropdown } from '../../Generic_Components/GenericDropdown';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ImagePoll from './ImagePoll'
import { ChevronRight } from 'lucide-react';



const CreatePoll = () => {

  const [pollTitle, setpollTitle] = useState("")

  const [options, setOptions] = useState([
    {
      id: 1,
      placeholder: "Option 1",
      value: "",
      imageUrl: "",
      public_id: "",
      isLoading: false
    },
    {
      id: 2,
      placeholder: "Option 2",
      value: "",
      imageUrl: "",
      public_id: "",
      isLoading: false
    },
  ])

  // State  for Poll Options Selection dropdown
  const [selectedValue, setSelectedValue] = useState("multiple-choice"); // Default value

  // Pole Settings Dropdown => Result Visibility
  const [ResultVisibilityValue, setResultVisibilityValue] = useState("Always Public"); // Default value


  // Create a state object to manage the state of each switch
  const [switchStates, setSwitchStates] = useState({
    "allow-comments": false,
    "One-Vote-Per-IP": true,
    "Allow-Multiple-Option-Selection": false,
    "Require-Participant-Name": false,
    "Signin-to-Vote": false,
    "Close-Poll-on-Scheduled-Time": false
  });

  const [dateTime, setDateTime] = useState("");
  const [MoreSettings, setMoreSettings] = useState(false);

  const PollSettings = [
    { id: "One-Vote-Per-IP", label: "One Vote Per IP" },
    { id: "Allow-Multiple-Option-Selection", label: "Allow Multiple Option Selection" },
    { id: "Require-Participant-Name", label: "Require Participant Name" },
  ];
  const MorePollSettings = [
    { id: "allow-comments", label: "Allow Comments" },
    { id: "Signin-to-Vote", label: "Signin to Vote" },
    // Result Visibility Dropdown
    { id: "Close-Poll-on-Scheduled-Time", label: "Close Poll on Scheduled Time" },
  ];

  const handleToggle = (id) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const DropdownOptions = ["Always Public", "Public after end Date", "Public after Vote", "Not Public"]

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const CreatePoll = async () => {
    try {
        // Validate required fields for image poll
        if (selectedValue === "image-poll") {
            const hasEmptyFields = options.some(option => !option.value || !option.imageUrl);
            if (hasEmptyFields) {
                throw new Error("Please fill in all options and upload images for each option");
            }
        }

        const pollOptions = selectedValue === "image-poll" 
            ? options.map((item) => ({
                text: item.value,
                imageUrl: item.imageUrl,
                public_id: item.public_id
            })).filter(option => option.text && option.imageUrl) // Ensure both text and image exist
            : options.map((item) => ({
                text: item.value
            })).filter(option => option.text); // Filter out empty options

        if (pollOptions.length < 2) {
            throw new Error("Please add at least two valid options");
        }

        const response = await axios.post("http://localhost:8008/poll", {
            "endDate": dateTime === "" ? "null" : dateTime,
            "poll_details": {
                "poll_title": pollTitle,
                "poll_options": pollOptions,
                "poll_type": selectedValue
            },
            "poll_settings": {
                "oneVotePerIP": switchStates["One-Vote-Per-IP"],
                "allowMultipleSelection": switchStates["Allow-Multiple-Option-Selection"],
                "requireParticipantName": switchStates["Require-Participant-Name"],
                "allowComments": switchStates["allow-comments"],
                "resultVisibility": ResultVisibilityValue,
                "closePollOnScheduleTime": switchStates["Close-Poll-on-Scheduled-Time"]
            },
            "Created_by": "67c1b8030a9d81fad20caa0e"
        });

        if (response.data && response.data.PollId) {
            return response.data.PollId;
        } else {
            throw new Error("No poll ID received from server");
        }
    } catch (err) {
        console.error("Error creating poll:", err.message);
        throw err;
    }
  }

  const HandleCreatePoll = async () => {
    try {
      if (!pollTitle.trim()) {
        setErrorMessage("Please enter a poll title");
        return;
      }

      setErrorMessage(""); // Clear any previous errors
      const pollId = await CreatePoll();

      if (pollId) {
        navigate(`/poll/${pollId}`);
      } else {
        setErrorMessage("Failed to create poll - no poll ID received");
      }
    } catch (err) {
      console.error("Error creating poll:", err);
      setErrorMessage(err.message || "Failed to create poll");
    }
  };


  const handleAddOption = () => {

    setOptions([...options, {
      id: options[options.length - 1].id + 1,
      placeholder: `Option ${options[options.length - 1].id + 1}`,
      value: "",
      imageUrl: "",
      public_id: "",
      isLoading: false
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
    <div className='bg-[#111827] w-full min-h-screen flex flex-col justify-center items-center'>
      <div className='mb-8 pt-8'>
        <h1 className='text-white text-2xl font-medium text-center'>Create a Vibe Poll</h1>
        <h1 className='text-xs font-extralight text-gray-400 text-center'>Complete the below fields to create your poll.</h1>
      </div>

      <div className="bg-[#1F2937] sm:w-xl max-sm:w-sm p-5 rounded-lg border-t-3 border-[#8E51FF] max-h-[80vh] overflow-y-auto mb-8">
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md">
            <p className="text-red-200 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Poll Title */}
        <div className='mb-8'>
          <Label className="text-white text-xs pb-1">Poll Title</Label>
          <Input
            type="text"
            placeholder="Poll Title"
            className='p-3 text-white bg-[#2A3441] border-[#4e5155] text-sm'
            value={pollTitle}
            onChange={(e) => setpollTitle(e.target.value)} // Fixed syntax
          />
        </div>

        {/* Poll Options */}
        {/* - Multiple Choice , Image Poll  */}

        <div className='pb-6'>
          <Label className="text-white text-xs pb-1">Poll Type</Label>
          <div className="flex items-center">
            <PollTypeDropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          </div>
        </div>


        {selectedValue === "image-poll" ? (
          <ImagePoll options={options} setOptions={setOptions} />
        ) : (<div className='mb-8'>
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
        </div>)
        }





        <Label className="text-white text-xs pb-1">Poll Settings</Label>

        <div className='flex space-x-24 flex-wrap'>

          {PollSettings.map((config) => (
            <div key={config.id} className="flex items-center space-x-2 my-1.5">
              <Switch
                id={config.id}
                onChange={() => handleToggle(config.id)} // Pass the specific switch ID
                checked={switchStates[config.id]} // Use the state for this specific switch
              />
              <Label htmlFor={config.id} className="text-white">
                {config.label}
                
              </Label>
            </div>
          ))}
        </div>



        {/* More Settings Menu */}
        <div className="space-y-2">
          {/* More Settings Toggle */}
          <Label
            className="text-[#8E51FF] text-xs pb-1 pt-2 flex items-center cursor-pointer"
            onClick={() => setMoreSettings((prev) => !prev)}
          >
            More Settings <ChevronRight size={15} className={`transition-transform ${MoreSettings ? "rotate-90" : ""}`} />
          </Label>

          {/* More Settings Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${MoreSettings ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {/* Result Visibility Dropdown */}
            <div className="py-1">
              <Label className="text-white text-xs pb-1">Result Visibility</Label>
              <div className="flex items-center">
                <GenericDropdown
                  ResultVisibilityValue={ResultVisibilityValue}
                  setResultVisibilityValue={setResultVisibilityValue}
                  Data={DropdownOptions}
                />
              </div>
            </div>

            {/* More Poll Settings Switches */}
            {MorePollSettings.map((config) => (
              <div key={config.id} className="flex items-center space-x-2 my-2.5">
                <Switch
                  id={config.id}
                  onChange={() => handleToggle(config.id)}
                  checked={switchStates[config.id]}
                />
                <Label htmlFor={config.id} className="text-white">
                  {config.label}
                </Label>
              </div>
            ))}

            {/* Date and Time Picker (Conditional) */}
            {switchStates["Close-Poll-on-Scheduled-Time"] && (
              <div className="max-w-xs bg-[#1F2937] rounded-lg shadow-lg mt-2">
                <label htmlFor="datetime" className="block text-sm font-medium text-white mb-1">
                  Select Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#374151] text-white border border-[#4B5563] rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  min={new Date().toISOString().slice(0, 16)}
                />
                {dateTime && (
                  <p className="mt-3 text-sm text-gray-400">
                    Selected Date and Time:{" "}
                    <span className="font-semibold text-violet-500">
                      {new Date(dateTime).toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>





        {/* ------------ */}

        <div className='my-3 bg-[#313b49] h-[1px]'></div>


        <div>
          <Button className="bg-[#8E51FF] hover:bg-[#8e51ffbb] cursor-pointer w-full my-2" onClick={HandleCreatePoll}>
            Create Poll
          </Button>
        </div>


      </div >

    </div >
  )
}

export default CreatePoll