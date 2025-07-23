"use client";
import Link from "next/link";
import { useState } from "react";
import styles from './Navbar.module.css';
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import DashboardDrawer from "./DashboardDrawer";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const pathname = usePathname();
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            const success = dispatch(logout());
            if (success) {
                toast.success("Logged Out successful!", {
                    autoClose: 500,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: false,
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="relative">
            <nav
                style={{
                    background: `${user ? "linear-gradient(135deg, #0a5dc1ff 0%, #0f61c6ff 50%, #0db596ff 100%)" : 'white'}`
                }}
                className="fixed top-0 left-0 right-0 z-45 h-14 shadow-lg " >
                <div className={`mx-auto ${user ? "w-[98%]" : "w-[85%]"} `}>
                    <div className="flex justify-between items-center h-14 relative">

                        {/* Not Signed In */}
                        {!user &&
                            <>
                                {/* Left - Logo +Name */}
                                <div className="flex items-center">
                                    <Link href="/onboarding">
                                        <img
                                            src="/logo.png"
                                            alt="Logo"
                                            className="w-8 mr-2"
                                        />
                                    </Link>
                                    <Link href="/onboarding" className="text-xl font-bold">
                                        Dashboard
                                    </Link>
                                </div>

                                {/* Center - Home link */}
                                <div className="hidden md:flex  absolute left-1/2 transform -translate-x-1/2">
                                    <Link
                                        href="/onboarding"
                                        className={`text-lg font-medium ${styles.navLink} ${pathname === '/onboarding' ? styles.active : ''} `}
                                    >
                                        Home
                                    </Link>
                                </div>

                                {/* Right - Desktop Links */}
                                <div className="hidden md:flex space-x-8">
                                    <Link href="/login" className={`relative font-medium pb-1 ${styles.navLink} ${pathname === '/login' ? styles.active : ""} `}>
                                        Login
                                    </Link>
                                    <Link href="/register" className={`relative font-medium pb-1 ${styles.navLink} ${pathname === '/register' ? styles.active : ""} `}>
                                        Register
                                    </Link>
                                </div>

                                {/* Hamburger (Mobile) */}
                                <div className="md:hidden">
                                    <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                                        <FaBars className="text-[22px]" />
                                    </button>
                                </div>

                                {/* Mobile Drawer */}
                                <div
                                    className={`fixed top-0 right-0 h-full w -1/2 bg-white shadow-lg  transition-transform duration-300 z-30
                            ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden p-6`}
                                >
                                    <div className="flex flex-col items-center space-y-6 ">
                                        <Link
                                            href="/"
                                            onClick={handleClose}
                                            className={`relative pb-1 font-medium ${styles.navLink} ${pathname === '/' ? styles.active : ""} `}
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href="/login"
                                            onClick={handleClose}
                                            className={`relative pb-1 font-medium ${styles.navLink} ${pathname === '/login' ? styles.active : ""} `}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={handleClose}
                                            className={`relative pb-1 font-medium ${styles.navLink} ${pathname === '/register' ? styles.active : ""} `}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </>
                        }
                        {/* Signed In  */}
                        {
                            user &&
                            <>
                                {/* Left - Sidebar Toggle */}
                                <div className="flex items-center gap-4 text-white">
                                    <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                                        <FaBars className="text-[22px]" />
                                    </button>
                                </div>

                                {/* Center - Home link */}
                                <div className="hidden md:flex  absolute left-1/2 transform -translate-x-3">
                                    <Link
                                        href="/home"
                                        className={`text-xl text-white font-medium `}
                                    >
                                        Dashboard
                                    </Link>
                                </div>

                                {/* Right - Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="text-sm cursor-pointer font-semibold bg-white text-blue-700 px-4 py-1 rounded hover:bg-white/90 transition"
                                >
                                    Logout
                                </button>
                            </>
                        }
                    </div>
                </div>
            </nav >

            {/* Sidebar Drawer */}
            {user && <DashboardDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>

    );
}