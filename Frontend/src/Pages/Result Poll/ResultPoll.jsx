import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axois from 'axios'
import { useParams, Link } from "react-router-dom";
import DynamicPieChart from './PiePollResult'
import ResultSlider from './ResultSlider'
import { useAuth } from '@clerk/clerk-react';


const ResultPoll = () => {

  const { getToken } = useAuth();


  const [Result, setResult] = useState();
  const [PollData, setPollData] = useState();
  const [Sum, setSum] = useState();
  const { poll_id } = useParams()
  const [pollResults, setPollResults] = useState();

  const [SliderResults, setSliderResults] = useState();
  const [pollOptions, setPollOptions] = useState(null);



  // Convert object to array format for PieChart
  function convertObjectToArray(obj) {
    return Object.keys(obj).map(key => ({
      name: key,
      value: obj[key]
    }));
  }


  // Convert Result object to ResultSlider format with image support
  const convertResultToSliderFormat = (result, pollOptions) => {
    if (!result || !pollOptions) {
      console.warn('Missing result or pollOptions:', { result, pollOptions });
      return [];
    }
    
    const totalVotes = Object.values(result).reduce((acc, value) => acc + value, 0);

    // Log the structure of poll options for debugging
    console.log('Processing poll options:', JSON.stringify(pollOptions, null, 2));

    return Object.keys(result).map((key) => {
      // Find the corresponding poll option to get the image URL
      const pollOption = pollOptions.find(option => {
        const optionMatches = option.text === key;
        if (optionMatches) {
          console.log('Found matching option:', option);
        }
        return optionMatches;
      });
      
      if (!pollOption) {
        console.warn(`No matching poll option found for key: "${key}" in options:`, pollOptions);
      }

      return {
        label: key,
        votes: result[key],
        percentage: totalVotes === 0 ? 0 : Math.round((result[key] / totalVotes) * 100),
        imageUrl: pollOption?.imageUrl || null // Add image URL if available
      };
    });
  };


  // Function to simulate adding or updating poll results
  const updatePollResults = () => {
    // Example of dynamically updating poll data
    const newResults = [
      { name: 'Strongly Agree', value: 50 },
      { name: 'Agree', value: 35 },
      { name: 'Neutral', value: 10 },
      { name: 'Disagree', value: 3 },
      { name: 'Strongly Disagree', value: 2 }
    ];

    setPollResults(newResults);
  };


  const GetPollResult = async () => {
    try {
      const token = await getToken();
      
      // Get poll data first to ensure we have the options
      const pollData = await axois.get(`http://localhost:8008/poll/${poll_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the complete poll data for debugging
      console.log('Complete Poll Data:', pollData.data.PollData);
      
      const options = pollData.data.PollData?.poll_details?.poll_options;
      setPollOptions(options);
      
      // Check if this is an image poll by looking for imageUrl in options
      const hasImages = options?.some(option => option.imageUrl);
      console.log('Has Images:', hasImages);
      
      if (!options) {
        console.warn('No poll options found in poll data');
      }
      
      setPollData({
        ...pollData.data.PollData,
        poll_details: {
          ...pollData.data.PollData.poll_details,
          poll_type: hasImages ? "image-poll" : "multiple-choice"
        }
      });
      
      // Then get the results
      const PollResult = await axois.get(`http://localhost:8008/vote/result/${poll_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Log the complete results data for debugging
      console.log('Complete Results Data:', PollResult.data);
      
      setResult(PollResult.data.Result);
      const Piedata = convertObjectToArray(PollResult.data.Result);
      setPollResults(Piedata);

      // Create slider data with the poll options we already have
      const SliderData = convertResultToSliderFormat(
        PollResult.data.Result,
        options
      );
      
      setSliderResults(SliderData);
      
      let sum = Object.values(PollResult.data.Result).reduce((acc, value) => acc + value, 0);
      setSum(sum);
    } catch (err) {
      console.error("Error in GetPollResult:", err);
      console.error("Error details:", err.message);
    }
  };


  const getPollData = async () => {


    try {
      const token = await getToken();
      const response = await axois.get(`http://localhost:8008/poll/${poll_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPollData(response.data.PollData)
      console.log(response.data.PollData)
    } catch (err) {
      console.log("Error :", err.message)
    }

  }

  useEffect(() => {
    GetPollResult()
    getPollData()
  }, [poll_id])

  return (
    <div className='bg-[#111827] w-full h-screen flex flex-col justify-center items-center'>


      <div className="bg-[#1F2937] p-5 rounded-lg border-t-3 border-[#8E51FF]  max-[464px]:w-[330px] md:w-3xl">



        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight text-white'>{PollData?.poll_details.poll_title}</h1>
          <h1 className='scroll-m-20 text-xs font-extralight tracking-tight text-white'>By {PollData?.Created_by[0]}</h1>
        </div>

        <div className='my-3 bg-[#565758] h-[1px]'></div>

        {/* <h1 className='scroll-m-20 text-md font-semibold tracking-tight text-white mb-5'>Total Votes : {Sum}</h1>


        {Result && typeof Result === "object" ? (
          Object.entries(Result).map(([key, value]) => (
            <h1 key={key} className='text-white'>
              {key} : {value}
            </h1>
          ))
        ) : (
          <p className='text-red-500'>No valid data</p>
        )} */}

        <div className='flex items-center max-md:flex-col justify-center'>

          <ResultSlider
            polls={SliderResults}
            theme="default"
            showImages={Boolean(pollOptions?.some(option => option.imageUrl))}
          />

          {/* Pie Chart Component */}
          <div className="scale-75">
            <DynamicPieChart data={pollResults} />
          </div>

        </div>



        {/* Optional: Button to update results */}
        {/* <button
          onClick={updatePollResults}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Results
        </button> */}




        <div className=' bg-[#565758] h-[1px]'></div>

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