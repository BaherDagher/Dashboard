"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from 'react-icons/fa';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login, setShowForgotPassword, signInWithGoogle } from "@/redux/slices/authSlice";
import ForgetPasswordForm from "./ForgetPasswordForm";

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, isLoading, isGoogleLoading, error, showForgotPassword } = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false);


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(login(values)).unwrap();
                toast.success("Login successful!", {
                    autoClose: 500,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: false,
                });
            }
            catch (error) {
                console.log(error)
            }
        }
    });

    const handleGoogleLogin = async () => {
        try {
            await dispatch(signInWithGoogle());
            if (user) {
                toast.success("Signed in with Google!", {
                    onClose: () => router.push("/home"),
                    autoClose: 500,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: false,
                });
            }
        }
        catch {
            toast.error("Google sign-in failed");
        }
    };


    useEffect(() => {
        dispatch(clearAuthError());
        formik.resetForm();
        dispatch(setShowForgotPassword(false));
        setShowPassword(false);
    }, []);

    if (showForgotPassword) {
        return (
            <ForgetPasswordForm
                onBack={() => dispatch(setShowForgotPassword(false))}
            />
        );
    }

    return (
        <div
            className="flex-1 flex flex-col justify-center items-center py-4 md:py-0 px-8 md:px-0">
            <div
                style={{ boxShadow: '0 0 10px rgba(0,0,0,0.25)' }}
                className="w-full flex justify-center items-center py-8 px-12 rounded-lg max-w-md mx-auto">
                <div className="w-full">
                    <h1
                        style={{
                            background: "linear-gradient(135deg, #0072ff 0%, #00c6a2ff 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            display: 'block'
                        }}
                        className="text-3xl font-bold mb-3 text-center">Login</h1>
                    <p className="text-gray-700 mb-6 text-center">
                        Access your budget dashboard and manage finances
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className="space-y-4 ">
                        {/* Email */}
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
                            {formik.touched.email && formik.values.email !== "" && formik.errors.email ? (
                                <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
                            ) : null}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="password">
                                Password <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("password")}
                                    className={`w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-blue-500"
                                        } cursor-pointer`}
                                    placeholder="Enter Your Password"

                                />
                                <span
                                    className="absolute right-0 mr-2 mt-2 text-gray-600 hover:text-blue-500 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </span>
                                {formik.touched.password && formik.values.password !== "" && formik.errors.password ? (
                                    <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
                                ) : null}

                                <div className="flex justify-end ">
                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => dispatch(setShowForgotPassword(true))}
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!formik.isValid || !formik.dirty || isLoading || isGoogleLoading}
                            className={`my-6 w-full py-2 rounded-md font-semibold text-white ${!formik.isValid || !formik.dirty || isLoading || isGoogleLoading
                                ? "bg-blue-500 opacity-50 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                } flex justify-center items-center cursor-pointer`}
                        >
                            {isLoading ? <FaSpinner className="spin text-white" size={20} /> : "Sign In"}
                        </button>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading || isGoogleLoading}
                            className={` w-full py-2 rounded-md font-semibold border flex items-center cursor-pointer justify-center gap-2 ${isGoogleLoading
                                ? "border-blue-500 text-blue-500 cursor-not-allowed"
                                : "border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
                                } cursor-pointer`}
                        >

                            {isGoogleLoading ? (
                                <FaSpinner className="spin" size={20} />
                            ) : (
                                <>
                                    <FcGoogle size={22} /> Continue with Google
                                </>
                            )}
                        </button>

                        <div className="my-6 border-t border-gray-300"></div>

                        {/* Register Link */}
                        <p className="text-center text-gray-700 ">
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                onClick={() => router.push("/register")}
                                className="text-blue-600 font-medium underline cursor-pointer hover:text-blue-800 "
                            >
                                Register
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default LoginForm;