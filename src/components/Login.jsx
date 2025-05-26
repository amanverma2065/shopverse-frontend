import React from 'react'
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';


function Login() {
    const [state, setState] = useState("login");
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passAlert, setPassAlert] = useState("");
    const { setUser, navigate, axios, setAdmin } = useAppContext();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent double click

        setLoading(true);
        const loadingToastId = toast.loading(state === "login" ? "Logging in..." : "Sending OTP...");

        if (state === "login") {
            try {
                const resData = await axios.post("/api/auth/login", { email, password });
                toast.dismiss(loadingToastId);

                if (resData.data.success) {
                    const token = resData.data.token;
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("userData", JSON.stringify(resData.data.userData));

                    if (resData.data.userData.accountType === "user") {
                        setUser(resData.data.userData);
                        toast.success("Login Successful");
                        navigate("/");
                    } else if (resData.data.userData.accountType === "admin") {
                        setAdmin(resData.data.userData);
                        toast.success("Admin Login Successful");
                        navigate("/admin");
                    }
                } else {
                    toast.error(resData.data.message);
                    console.log("Else error: ", resData.data.message);
                }
            } catch (error) {
                toast.dismiss(loadingToastId);
                const backendMessage = error.response?.data?.message || "Login failed";
                toast.error(backendMessage);
                console.log("Catch error message: ", backendMessage);
            } finally {
                setLoading(false);
            }
        }

        if (state === "signup") {
            try {
                const sendOtpRes = await axios.post("/api/auth/sendotp", { email });
                toast.dismiss(loadingToastId);

                if (sendOtpRes.data.success) {
                    toast.success("OTP sent to email");
                    localStorage.setItem("signupData", JSON.stringify({ firstName, lastName, email, password, confirmPassword }));
                    navigate("/verify-otp");
                }
            } catch (error) {
                toast.dismiss(loadingToastId);
                const backendMessage = error.response?.data?.message || "OTP sending failed";
                toast.error(backendMessage);
            } finally {
                setLoading(false);
            }
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className={state === "login" ? "w-full max-w-md px-4" : "w-full max-w-4xl px-4"}>
                <div className={`bg-white rounded-2xl shadow-2xl border-0 transform hover:scale-[1.01] transition-transform duration-300 ${state === "login" ? "" : "my-6"}`}>
                    <div className="p-6 md:p-8">
                        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {state === "login" ? "Welcome Back!" : "Create Account"}</h2>
                        <form onSubmit={handleOnSubmit} className="space-y-6">

                            {state === "signup" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                            value={firstName}
                                            onChange={handleOnChange}
                                            disabled={loading}
                                            placeholder="Enter First Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 font-medium text-gray-700">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                            value={lastName}
                                            onChange={handleOnChange}
                                            disabled={loading}
                                            placeholder="Enter Last Name"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                    value={email}
                                    onChange={handleOnChange}
                                    disabled={loading}
                                    placeholder="Enter your email address"
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>

                            {state === "login" ? (
                                <div>
                                    <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Password</label>
                                    <div className="flex">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                            value={password}
                                            onChange={handleOnChange}
                                            disabled={loading}
                                            placeholder="Enter Password"
                                            required
                                        />
                                        <button
                                            className="px-4 border border-l-0 border-gray-200 rounded-r-xl hover:bg-gray-50 transition-colors duration-200"
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            disabled={loading}
                                        >
                                            {showPassword ? (
                                                <AiOutlineEyeInvisible className="text-xl text-gray-600" />
                                            ) : (
                                                <AiOutlineEye className="text-xl text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Password</label>
                                        <div className="flex">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                                value={password}
                                                onChange={handleOnChange}
                                                disabled={loading}
                                                placeholder="Enter Password"
                                                required
                                            />
                                            <button
                                                className="px-4 border border-l-0 border-gray-200 rounded-r-xl hover:bg-gray-50 transition-colors duration-200"
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                disabled={loading}
                                            >
                                                {showPassword ? (
                                                    <AiOutlineEyeInvisible className="text-xl text-gray-600" />
                                                ) : (
                                                    <AiOutlineEye className="text-xl text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                        {passAlert && <div className="text-red-500 mt-1 text-sm">{passAlert}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700">Confirm Password</label>
                                        <div className="flex">
                                            <input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                                value={confirmPassword}
                                                onChange={handleOnChange}
                                                disabled={loading}
                                                placeholder="Confirm Password"
                                                required
                                            />
                                            <button
                                                className="px-4 border border-l-0 border-gray-200 rounded-r-xl hover:bg-gray-50 transition-colors duration-200"
                                                type="button"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                disabled={loading}
                                            >
                                                {showConfirmPassword ? (
                                                    <AiOutlineEyeInvisible className="text-xl text-gray-600" />
                                                ) : (
                                                    <AiOutlineEye className="text-xl text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg transition-all duration-200
                                    ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 hover:scale-[1.02] hover:shadow-xl"}`}
                                >
                                    {loading ? (state === "login" ? "Signing In..." : "Sending OTP...") : (state === "login" ? "Sign In" : "Sign Up")}
                                </button>
                            </div>
                            <div className="text-center gap-x-2 flex justify-center items-center flex-wrap">
                                <p className="text-gray-600"> {state === "login" ? "Don't have an account?" : "Already have an account?"} </p>


                                {state === "login" ? (
                                    <NavLink onClick={() => setState("signup")} className="inline-block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium hover:opacity-80 transition-opacity duration-200">
                                        Create Account
                                    </NavLink>
                                ) : <NavLink onClick={() => setState("login")} className="inline-block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium hover:opacity-80 transition-opacity duration-200">
                                    Sign In
                                </NavLink>}

                            </div>

                            <div className="text-center gap-x-2 flex justify-center items-center">
                                <NavLink to='/reset-email' className="inline-block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium hover:opacity-80 transition-opacity duration-200">
                                    Forgot Password?
                                </NavLink>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login