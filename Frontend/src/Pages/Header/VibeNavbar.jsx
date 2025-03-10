import React, { useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


const VibeNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Create Poll', path: '/create' },
        { name: 'My Polls', path: '/polls' },
        { name: 'About', path: '/about' }
    ];

    return (
        <>
            <nav className=' bg-gradient-to-r from-[#1F2937] to-[#374151] w-full fixed top-0 z-50 shadow-lg'>
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className='flex items-center space-x-2'>
                        <h1 className='text-white font-bold text-2xl hover:text-gray-200 transition duration-300'>
                            PollVibe
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex space-x-6 items-center'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className='text-white hover:text-gray-300 transition duration-300 font-medium'
                            >
                                {link.name}
                            </Link>
                        ))}
                        <header className="flex items-center justify-end p-4 ">
                            <SignedOut>
                                <SignInButton
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out flex items-center space-x-2"
                                >
                                    <span>Sign In</span>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-8 h-8 ring-2 ring-blue-500 ring-offset-2",
                                            userButtonPopoverCard: "shadow-xl border border-gray-100 rounded-lg",
                                            userButtonTrigger: "hover:bg-gray-100 rounded-full p-1 transition-colors"
                                        }
                                    }}
                                    
                                />
                            </SignedIn>
                        </header>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-white focus:outline-none'
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className='md:hidden absolute top-14 left-0 w-full bg-[#1F2937]'>
                        <div className='flex flex-col items-center space-y-4 py-4'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className='text-white hover:text-gray-300 transition duration-300'
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}


            </nav>

            {/* Content Area with Top Padding */}
            <div className='pt-14'>
                <Outlet />
            </div>


        </>
    )
}

export default VibeNavbar