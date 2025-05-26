import React, { useState } from 'react';
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

function Signup() {

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passAlert, setPassAlert] = useState("");


    const { firstName, lastName, email, password, confirmPassword } = formData


    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    };

    // function handleOnChange(event) {
    //   setFormData( (prevData) => {
    //     return{
    //       ...prevData,
    //       [event.target.name]: event.target.value
    //     }
    //   })
    // };

    const handleOnSubmit = (e) => {
        e.preventDefault();


        if (password.length < 8) {
            setPassAlert('Password must be of at least eight characters')
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }

        // dispatch(signupUser(formData))
        //   .unwrap()
        //   .then(() => {
        //     toast.success("User Registered Successfully");
        //     navigate("/auth/login");
        //   })
        //   .catch((error) => {
        //     toast.error("Signup failed");
        //     console.error("Signup Error",error);
        //   });



        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="w-full max-w-4xl px-4">
                <div className="bg-white rounded-2xl shadow-2xl border-0 transform hover:scale-[1.01] transition-transform duration-300 my-6">
                    <div className="p-6 md:p-8">
                        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h2>
                        <form onSubmit={handleOnSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        value={firstName}
                                        onChange={handleOnChange}
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
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        value={lastName}
                                        onChange={handleOnChange}
                                        placeholder="Enter Last Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={email}
                                    onChange={handleOnChange}
                                    placeholder="Enter your email address"
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Password</label>
                                    <div className="flex">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={password}
                                            onChange={handleOnChange}
                                            placeholder="Enter Password"
                                            required
                                        />
                                        <button
                                            className="px-4 border border-l-0 border-gray-200 rounded-r-xl hover:bg-gray-50 transition-colors duration-200"
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
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
                                            className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={confirmPassword}
                                            onChange={handleOnChange}
                                            placeholder="Confirm Password"
                                            required
                                        />
                                        <button
                                            className="px-4 border border-l-0 border-gray-200 rounded-r-xl hover:bg-gray-50 transition-colors duration-200"
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
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

                            <div>
                                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                                    Create Account
                                </button>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-gray-600">Already have an account?</p>
                                <NavLink to="/login" className="inline-block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium hover:opacity-80 transition-opacity duration-200">
                                    Login
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Signup