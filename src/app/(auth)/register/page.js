"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import RegisterWelcome from "@/components/Register/RegisterWelcome";
import RegisterForm from "@/components/Register/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main className="flex-1 flex">
        <div className="flex flex-col md:flex-row w-full bg-gray-50 overflow-x-hidden">
          {/* Left Side Web (Welcome) */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex flex-1 flex-col bg-white"
          >
            <RegisterWelcome />
          </motion.div>

          {/* Right Side Web (Form) */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto "
          >
            <RegisterForm />
          </motion.div>

          {/* Mobile No animation */}
          <div className=" flex md:hidden flex-1 flex-col bg-white overflow-y-auto ">
            <RegisterForm />
          </div>
        </div>
      </main>
    </>
  );
}
