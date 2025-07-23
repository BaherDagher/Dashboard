"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError, setShowForgotPassword } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { checkUserEmailExists } from "@/firebase/userServices";

const ForgetPasswordForm = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);
    const [submitted, setSubmitted] = useState(false);
    const [hasResentOnce, setHasResentOnce] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
        }),
        onSubmit: async (values) => {
            await handleResetPassword(values.email);
        },
    });

    const handleResetPassword = async (email, isResend = false) => {

        dispatch(clearAuthError());
        const exists = await checkUserEmailExists(email);
        if (!exists) {
            formik.setFieldError("email", "No registered account was found associated with this email address.");
            return;
        }
        try {
            await dispatch(resetPassword(email)).unwrap();
            toast.success("Reset email sent!", {
                autoClose: 1500,
                pauseOnHover: false,
            });
            setSubmitted(true);
            setResendCooldown(30);
            if (isResend) {
                setHasResentOnce(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    return (
        <div className="flex-1 flex flex-col justify-center items-center py-4 px-8">
            <div
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.25)" }}
                className="w-full flex justify-center items-center py-8 px-12 rounded-lg max-w-md mx-auto"
            >
                <div className="w-full">
                    <h1
                        style={{
                            background: "linear-gradient(135deg, #0072ff 0%, #00c6a2ff 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            display: "block",
                        }}
                        className="text-3xl font-bold mb-3 text-center"
                    >
                        Forgot Your Password?
                    </h1>
                    <p className="text-gray-700 mb-6 text-center">
                        Don’t worry — it happens! Just enter the email you used to sign up, and we'll send you instructions to reset your password.
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                            {error}
                        </div>
                    )}


                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="email">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...formik.getFieldProps("email")}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                placeholder="Enter Your Email"
                            />
                            {formik.touched.email &&
                                formik.values.email !== "" &&
                                formik.errors.email ? (
                                <p className="text-red-600 text-sm mt-1">
                                    {formik.errors.email}
                                </p>
                            ) : null}
                        </div>

                        {!submitted && (
                            <button
                                type="submit"
                                disabled={!formik.isValid || !formik.dirty || isLoading}
                                className={`mt-4 w-full py-2 rounded-md font-semibold text-white ${!formik.isValid || !formik.dirty || isLoading
                                    ? "bg-blue-500 opacity-50 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    } flex justify-center items-center cursor-pointer `}
                            >
                                {isLoading ? (
                                    <FaSpinner className="animate-spin text-white" size={20} />
                                ) : (
                                    "Send Reset Email"
                                )}
                            </button>
                        )}

                        {submitted && (
                            <>
                                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center text-sm">
                                    A password reset link was sent to your email.
                                    <p className="text-gray-700 mt-2">
                                        Didn't receive the email? Check your spam folder or try resending below.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch(setShowForgotPassword(false));
                                        router.push("/login");
                                    }}
                                    className="cursor-pointer w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
                                >
                                    Back to Login
                                </button>

                                <button
                                    type="button"
                                    disabled={resendCooldown > 0 || isLoading || hasResentOnce}
                                    onClick={() => handleResetPassword(formik.values.email, true)}
                                    className={`w-full py-2 rounded-md font-semibold text-white text-sm ${resendCooldown > 0 || isLoading || hasResentOnce
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700"
                                        } flex justify-center items-center transition cursor-pointer`}
                                >
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin mr-2 bg-green-600 text-white" />
                                    ) : hasResentOnce ? (
                                        "Resend Disabled"
                                    ) : resendCooldown > 0 ? (
                                        `Resend in ${resendCooldown}s`
                                    ) : (
                                        "Resend Email"
                                    )}
                                </button>
                            </>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordForm;