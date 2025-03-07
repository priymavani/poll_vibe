import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Image, List, Check, ChevronDown } from "lucide-react";

export function GenericDropdown({ ResultVisibilityValue, setResultVisibilityValue, Data }) {

  return (
    <Select value={ResultVisibilityValue} onValueChange={setResultVisibilityValue}>
      <SelectTrigger className="w-[220px] bg-[#1F2937] text-white border border-[#4e5155] flex justify-between items-center px-3 py-2 rounded-md focus:ring-2 focus:ring-violet-500">
        <SelectValue placeholder="Select poll type" />
      </SelectTrigger>

      <SelectContent className="bg-[#1F2937] text-white border border-[#4e5155] rounded-md shadow-lg">
        {Data?.map((item) => (
          <SelectItem
            key={item} // Unique key for each item
            value={item} // Dynamic value based on the item
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-violet-700"
          >
            <Check
              className={`h-4 w-4 ${ResultVisibilityValue === item ? "text-violet-500" : "text-transparent"
                }`}
            />
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}