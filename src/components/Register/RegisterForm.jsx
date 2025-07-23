"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register, signInWithGoogle } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const { isLoading, isGoogleLoading, error, user } = useSelector(
        (state) => state.auth
    );

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            repassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,}$/,
                    "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
                )
                .required("Password is required"),
            repassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm your password"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(register(values)).unwrap();
                toast.success("Registration successful!", {
                    autoClose: 500,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: false,
                });
                router.push("/home");
            }
            catch (error) {
                console.log(error)
            }
        },
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
    }, []);

    return (
        <div
            className="flex-1 flex flex-col justify-center items-center py-4 md:py-0 px-8 md:px-0"
        >
            <div
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.25)" }}
                className="w-full flex flex-col justify-center items-center py-8 px-12 rounded-lg max-w-md mx-auto"
            >
                <h1
                    style={{
                        background: "linear-gradient(135deg, #0072ff 0%, #00c6a2ff 100%)",
                        backgroundClip: "text",
                        color: "transparent",
                        display: "block",
                    }}
                    className="text-3xl font-bold mb-3 text-center"
                >
                    Register
                </h1>
                <p className="text-gray-700 mb-6 text-center">
                    Create your account to manage budgets easily
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center w-full">
                        {error}
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} noValidate className="space-y-4 w-full">
                    {/* Name */}
                    <label
                        htmlFor="name"
                        className="block mb-2 font-semibold"
                    >
                        Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        {...formik.getFieldProps("name")}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                            }`}
                        placeholder="Enter Your Full Name"
                    />
                    {formik.touched.name && formik.values.name !== "" && formik.errors.name ? (
                        <p className="-mt-3 text-sm text-red-600">{formik.errors.name}</p>
                    ) : null}

                    {/* Email */}
                    <label
                        htmlFor="email"
                        className="block mb-2 font-semibold"   >
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        {...formik.getFieldProps("email")}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                            }`}
                        placeholder="Enter Your Email"
                    />
                    {formik.touched.email && formik.values.email !== "" && formik.errors.email ? (
                        <p className="-mt-3 text-sm text-red-600">{formik.errors.email}</p>
                    ) : null}

                    {/* Password */}
                    <label
                        htmlFor="password"
                        className="block mb-2 font-semibold"  >
                        Password <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            {...formik.getFieldProps("password")}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                            placeholder="Enter Your Password"
                        />
                        <span
                            className="absolute right-0 mr-2 mt-2 text-gray-600 hover:text-blue-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </span>
                        {formik.touched.password && formik.values.password !== "" && formik.errors.password ? (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                        ) : null}
                    </div>

                    {/* Repeat Password */}
                    <label
                        htmlFor="repassword"
                        className="block mb-2 font-semibold"  >
                        Repeat Password <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="repassword"
                            name="repassword"
                            type={showRePassword ? "text" : "password"}
                            autoComplete="new-password"
                            {...formik.getFieldProps("repassword")}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.repassword && formik.errors.repassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                            placeholder="Repeat Your Password"
                        />
                        <span
                            className="absolute right-0 mr-2 mt-2 text-gray-600 hover:text-blue-500 cursor-pointer"
                            onClick={() => setShowRePassword(!showRePassword)}
                        >
                            {showRePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </span>
                        {formik.touched.repassword && formik.values.repassword !== "" && formik.errors.repassword ? (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.repassword}</p>
                        ) : null}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="mt-6 w-full flex justify-center items-center rounded-md cursor-pointer bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
                    </button>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading}
                        className="mt-4 w-full flex justify-center items-center rounded-md border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGoogleLoading ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <>
                                <FcGoogle className="mr-2" size={22} />
                                Continue with Google
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-700 text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-blue-600 font-semibold underline cursor-pointer hover:text-blue-800 "
                        type="button"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;