import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useAppContext } from '../context/AppContext';

function AddAddress() {

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", phone: "" });

    const { firstName, lastName, email, street, city, state, phone } = formData;

    const [loading, setLoading] = useState(false);

    const { axios, navigate } = useAppContext();

    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        const loadingToast = toast.loading("Saving address...");

        try {
            const resData = await axios.post("/api/address/addAddress", {
                firstName,
                lastName,
                email,
                street,
                city,
                state,
                phone,
            });

            toast.dismiss(loadingToast);

            if (resData.data.success) {
                toast.success("Address Added");
                setFormData({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", phone: "" });
                navigate("/cart");
            } else {
                toast.error("Cannot add address!");
            }
        } catch (error) {
            console.log(error);
            toast.dismiss(loadingToast);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="w-full max-w-4xl px-4">
                <div className="bg-white rounded-2xl shadow-2xl border-0 transform hover:scale-[1.01] transition-transform duration-300 my-6">
                    <div className="p-6 md:p-8">
                        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Add Shipping Address
                        </h2>
                        <form onSubmit={onSubmitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleOnChange}
                                        disabled={loading} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
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
                                        value={lastName}
                                        onChange={handleOnChange}
                                        disabled={loading} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
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
                                    value={email}
                                    onChange={handleOnChange}
                                    disabled={loading} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                    placeholder="Enter your email address"
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="street" className="block mb-2 font-medium text-gray-700">Street Address</label>
                                <input
                                    id="street"
                                    type="text"
                                    name="street"
                                    value={street}
                                    onChange={handleOnChange}
                                    disabled={loading} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                    placeholder="Enter Street Address"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="city" className="block mb-2 font-medium text-gray-700">City</label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={handleOnChange}
                                        disabled={loading} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                        placeholder="Enter City"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="state" className="block mb-2 font-medium text-gray-700">State</label>
                                    <input
                                        id="state"
                                        type="text"
                                        name="state"
                                        value={state}
                                        onChange={handleOnChange}
                                        disabled={loading} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                        placeholder="Enter State"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={handleOnChange}
                                    disabled={loading} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                    placeholder="Enter Phone Number"
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 transform hover:scale-[1.02]'
                                    }`}>
                                    {loading ? "Saving..." : "Save Address"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress