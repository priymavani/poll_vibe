import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react';
import { useParams, Link } from "react-router-dom";
import { CircleAlert } from 'lucide-react';
import { Copy, Facebook, Twitter, Linkedin } from "lucide-react";




const ShareComponent = () => {

    const shareUrl = window.location.href; // Get the current URL
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };


    return (

        <>

            <div className='flex flex-col justify-center items-center'>

                <div className="bg-[#1F2937] max-md:min-w-8/9 md:w-xl p-5 rounded-lg border-t-3 border-[#8E51FF] text-white ">

                    <h2 className="text-lg font-semibold">Share this poll</h2>

                    {/* Link Box with Copy Button */}
                    <div className="flex items-center bg-[#8e51ff25] rounded-lg px-3 py-2 mt-2 w-full font-mono">
                        <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="bg-transparent text-white text-sm flex-1 outline-none"
                        />
                        <Button onClick={handleCopy} className="bg-[#8E51FF] hover:bg-[#8e51ffbb] ml-2">
                            {copied ? "Copied!" : <Copy size={16} />}
                        </Button>
                    </div>

                    {/* Social Media Icons */}
                    {/* <div className="flex space-x-4 mt-4">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                            <Facebook className="w-6 h-6 hover:text-blue-500 transition" />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-6 h-6 hover:text-blue-400 transition" />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-6 h-6 hover:text-blue-700 transition" />
                        </a>
                        <button onClick={handleCopy} className="hover:text-gray-400">
                            <Link className="w-6 h-6" />
                        </button>
                    </div> */}
                </div>




            </div>

        </>
    )
}

export default ShareComponent