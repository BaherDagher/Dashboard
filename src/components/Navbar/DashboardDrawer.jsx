"use client";

import { auth } from '@/firebase/firebaseConfiguration';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBars, FaSpinner } from 'react-icons/fa';
import { FiArrowLeft, FiHome, FiUsers, FiHelpCircle, FiPieChart, FiTrendingUp, } from 'react-icons/fi';

const navItems = [
    { href: '/home', label: 'Home', icon: <FiHome size={20} /> },
    { href: '/team', label: 'Manage Team', icon: <FiUsers size={20} /> },
    { href: '/faq', label: 'FAQ', icon: <FiHelpCircle size={20} /> },
    { href: '/pie', label: 'Pie Chart', icon: <FiPieChart size={20} /> },
    { href: '/line', label: 'Line Chart', icon: <FiTrendingUp size={20} /> },
];

const DashboardDrawer = ({ isOpen, setIsOpen }) => {

    const [photoURL, setPhotoURL] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const getInitials = (fullName) => {
        if (!fullName) return "?";

        const names = fullName
            .trim()
            .split(" ")
            .filter((name) => name.length > 0);

        if (names.length === 0) return "?";
        if (names.length === 1) return names[0][0].toUpperCase();

        return (
            names[0][0].toUpperCase() +
            names[names.length - 1][0].toUpperCase()
        );
    };

    const initials = getInitials(displayName);

    useEffect(() => {
        setIsClient(true);
        if (auth.currentUser) {
            setPhotoURL(auth.currentUser.photoURL);
            setDisplayName(auth.currentUser.displayName || '');
        }
        setLoading(false);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-50  
        ${isOpen ? 'w-64' : 'w-15'} `}
        >
            <div
                className={`h-14 w-full flex items-center justify-end px-2 ${isOpen ? 'bg-white' : 'bg-[#0a5dc1ff]'}`}
            >
                <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${isOpen ? 'hover:bg-gray-100' : 'hover:bg-black/10'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <FiArrowLeft
                            size={20}
                            className="text-black  cursor-pointer"
                        />
                    ) : (
                        <FaBars
                            size={22}
                            className="text-white cursor-pointer"
                        />
                    )}
                </button>
            </div>


            {/* User Info */}
            <div className='flex flex-col items-center space-y-4'>
                <div className="flex justify-center items-center mt-4">
                    {!isClient || loading ? (
                        <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-400 select-none">
                            <FaSpinner className="animate-spin text-3xl" />
                        </div>
                    ) : photoURL ? (
                        <Image
                            src={photoURL}
                            alt="User Avatar"
                            width={isOpen ? 80 : 48}
                            height={isOpen ? 80 : 48}
                            className="rounded-full object-cover border-1 border-black"
                            priority
                        />
                    ) : (
                        <div className={`${isOpen ? "w-20 h-20 text-2xl" : "w-12 h-12 text-lg"} rounded-full bg-gray-300 flex items-center justify-center  font-semibold text-gray-700`}>
                            {initials}
                        </div>
                    )}
                </div>

                {isOpen &&
                    <>
                        <div>
                            <h1 className='font-medium text-[18px]'>{auth.currentUser?.displayName}</h1>
                        </div>
                        <div>
                            <h1 className='-mt-3 font-medium text-[16px] text-[#0a5dc1ff]'>Admin</h1>
                        </div>
                    </>

                }
            </div>

            <div className="my-3 border-t border-gray-300"></div>

            <div className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-5 py-2 rounded-md hover:bg-gray-100
                           ${pathname === item.href ? 'bg-[#e5f0ff] text-[#0a5dc1ff] font-semibold' : 'text-gray-800'} `}
                        >
                            <span className={`${pathname === item.href ? 'text-[#0a5dc1ff]' : 'text-gray-700'}`}>
                                {item.icon}
                            </span>
                            {isOpen && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>
        </div >
    );
};

export default DashboardDrawer;