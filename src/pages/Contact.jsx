import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';

function Contact() {
    const { axios, navigate } = useAppContext();
    const [formData, setFormData] = useState({ username: "", email: "", queryType: "", message: "" });
    const [loading, setLoading] = useState(false); // <-- NEW loading state

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // Prevent duplicate submissions

        setLoading(true); // Start loading
        const toastId = toast.loading("Sending your message...");

        try {
            const res = await axios.post('/api/contactUs/contact-us', {
                userName: formData.username,
                email: formData.email,
                queryType: formData.queryType,
                message: formData.message,
            });

            if (res.data.success) {
                toast.success("Thanks for contacting us", { id: toastId });
                setFormData({ username: "", email: "", queryType: "", message: "" });
                navigate("/");
            } else {
                toast.error("Something went wrong.", { id: toastId });
            }
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("Failed to submit form.", { id: toastId });
        } finally {
            setLoading(false); // Stop loading regardless of success/failure
        }
    };

    return (
        <div className="min-h-screen flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 w-full py-6">
            <div className="lg:w-2/3 w-full max-w-4xl px-4">
                <div className="bg-white rounded-2xl shadow-2xl border-0 transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="p-6 md:p-8">
                        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Contact Us
                        </h2>
                        <form className="space-y-6" onSubmit={handleOnSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleOnChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleOnChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="queryType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Query Type
                                </label>
                                <select
                                    id="queryType"
                                    name="queryType"
                                    value={formData.queryType}
                                    onChange={handleOnChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                                >
                                    <option value="">Select query type</option>
                                    <option value="orders">Orders</option>
                                    <option value="payments">Payments</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleOnChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-60"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
