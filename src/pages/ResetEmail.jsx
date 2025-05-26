import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

function ResetEmail() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { axios, navigate } = useAppContext();

    const handleOnChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Sending OTP...");
        setLoading(true);

        try {
            const sendResetOtpRes = await axios.post("/api/reset-password/send-reset-otp", { email });

            if (sendResetOtpRes.data.success) {
                toast.success("Reset OTP sent to email", { id: toastId });

                // Store email temporarily
                localStorage.setItem("Reset-Email", JSON.stringify(email));

                navigate("/verify-reset-otp");
            }
        } catch (error) {
            const backendMessage = error.response?.data?.message || "OTP sending failed";
            toast.error(backendMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-indigo-100">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Reset Password
                </h2>

                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50"
                            placeholder="Enter your email"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg ${loading
                                ? "bg-indigo-400 text-white cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 hover:shadow-xl"
                            }`}
                    >
                        {loading ? "Sending OTP..." : "Send Reset OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetEmail;
