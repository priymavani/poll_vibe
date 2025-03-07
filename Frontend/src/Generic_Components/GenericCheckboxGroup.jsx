"use client";

import { useState } from "react";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// const items = [
//     {
//         id: "recents",
//         label: "Recents",
//     },
//     {
//         id: "home",
//         label: "Home",
//     },
//     {
//         id: "applications",
//         label: "Applications",
//     },
//     {
//         id: "desktop",
//         label: "Desktop",
//     },
//     {
//         id: "downloads",
//         label: "Downloads",
//     },
//     {
//         id: "documents",
//         label: "Documents",
//     },
// ];

export function GenericCheckboxGroup({ CheckboxData,selectedItems,setSelectedItems }) {


    let MappingData = CheckboxData?.map((item) => {
        return {
            id: item,
            label: item,
        }
    })


    // Handle checkbox change
    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId) // Remove item if already selected
                : [...prevSelectedItems, itemId] // Add item if not selected
        );
    };

    console.log(selectedItems)
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if at least one item is selected
        // if (selectedItems.length === 0) {
        //   toast({
        //     title: "Error",
        //     description: "You have to select at least one item.",
        //   });
        //   return;
        // }

        // // Display selected items in a toast
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(selectedItems, null, 2)}</code>
        //     </pre>
        //   ),
        // });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
                {MappingData?.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                        {/* Custom Checkbox */}
                        <label htmlFor={item.id} className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id={item.id}
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                className="appearance-none w-5 h-5 border-2 border-[#8E51FF] rounded-md checked:bg-[#8E51FF] checked:border-[#8E51FF] focus:ring-2 focus:ring-[#8E51FF] focus:ring-offset-2 focus:ring-offset-[#1F2937] transition-all"
                            />
                            {/* Custom Checkmark */}
                            <span className="absolute w-5 h-5 flex items-center justify-center">
                                {selectedItems.includes(item.id) && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </span>
                        </label>
                        {/* Label */}
                        <label htmlFor={item.id} className="text-sm font-normal text-white">
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        </form>
    );
}