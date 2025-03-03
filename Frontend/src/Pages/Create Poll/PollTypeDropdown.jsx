import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Image, List, Check, ChevronDown } from "lucide-react";

export function PollTypeDropdown() {
  const [selectedValue, setSelectedValue] = useState("multiple-choice"); // Default value

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="w-[220px] bg-[#1F2937] text-white border border-[#4e5155] flex justify-between items-center px-3 py-2 rounded-md focus:ring-2 focus:ring-violet-500">
        <SelectValue placeholder="Select poll type" />
        {/* <ChevronDown className="h-4 w-4 text-gray-400" /> */}
      </SelectTrigger>

      <SelectContent className="bg-[#1F2937] text-white border border-[#4e5155] rounded-md shadow-lg">
        <SelectItem value="multiple-choice" className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-violet-700">
          <Check className={`h-4 w-4 ${selectedValue === "multiple-choice" ? "text-violet-500" : "text-transparent"}`} />
          Multiple choice
        </SelectItem>
        {/* <SelectItem value="meeting-poll" className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700">
          <Calendar className="h-4 w-4 text-gray-400" />
          Meeting poll
        </SelectItem> */}
        <SelectItem value="image-poll" className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700">
          <Image className="h-4 w-4 text-gray-400" />
          Image poll
        </SelectItem>
        {/* <SelectItem value="ranking-poll" className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700">
          <List className="h-4 w-4 text-gray-400" />
          Ranking poll
        </SelectItem> */}
      </SelectContent>
    </Select>
  );
}
