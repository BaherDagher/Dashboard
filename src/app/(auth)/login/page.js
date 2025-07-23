"use client";
import LoginForm from "@/components/Login/LoginForm";
import LoginWelcome from "@/components/Login/LoginWelcome";
import Head from "next/head";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex-1 flex">
        <div className="flex flex-1 flex-col md:flex-row w-full  bg-gray-50 overflow-x-hidden">
          {/* Left Side  Web (Welcome) */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex flex-1 flex-col bg-white"
          >
            <LoginWelcome />
          </motion.div>

          {/* Right Side Web (Form) */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto "
          >
            <LoginForm />
          </motion.div>

          {/* Mobile No animation */}
          <div className=" flex md:hidden flex-1 flex-col bg-white overflow-y-auto ">
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}
