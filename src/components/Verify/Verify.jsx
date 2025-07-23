"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "@/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { clearPendingEmail } from "@/features/auth/authSlice";

const Verify = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.pendingEmail);

    useEffect(() => {
        const interval = setInterval(() => {
            onAuthStateChanged(auth, (user) => {
                if (user && user.emailVerified) {
                    toast.success("Email verified!");
                    dispatch(clearPendingEmail());
                    router.push("/home");
                }
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [dispatch, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Please Verify Your Email
                </h2>
                <p className="text-gray-600 mb-6">
                    A verification email was sent to:
                </p>
                <p className="text-blue-600 font-semibold mb-6">{email}</p>
                <p className="text-sm text-gray-500">
                    After verifying, you’ll be redirected automatically.
                </p>
            </div>
        </div>
    );
};

export default Verify;