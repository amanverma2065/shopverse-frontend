import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

function VerifyResetOtp() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const { axios, navigate } = useAppContext();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleResendOtp = async () => {
        const toastId = toast.loading("Resending OTP...");
        setResendLoading(true);
        try {
            const email = JSON.parse(localStorage.getItem("Reset-Email"));
            if (!email) throw new Error("Email not found in local storage");

            const sendOtpRes = await axios.post("/api/reset-password/send-reset-otp", { email });

            if (sendOtpRes.data.success) {
                toast.success("OTP sent to email", { id: toastId });
            } else {
                toast.error(sendOtpRes.data.message || "Failed to resend OTP", { id: toastId });
            }
        } catch (error) {
            const backendMessage = error.response?.data?.message || error.message || "OTP sending failed";
            toast.error(backendMessage, { id: toastId });
        } finally {
            setResendLoading(false);
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            return toast.error("Please enter a valid 6-digit OTP");
        }

        const resetEmail = JSON.parse(localStorage.getItem("Reset-Email"));
        if (!resetEmail) {
            toast.error("Email missing");
            return navigate("/login");
        }

        const toastId = toast.loading("Verifying OTP...");
        setLoading(true);

        try {
            const res = await axios.post("/api/reset-password/verify-reset-otp", {
                email: resetEmail,
                otp: enteredOtp
            });

            if (res.data.success) {
                toast.success("Reset OTP Verified", { id: toastId });
                navigate("/reset-password");
            } else {
                toast.error(res.data.message || "Reset OTP verification failed", { id: toastId });
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Reset OTP verification failed";
            toast.error(msg, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-indigo-100">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Verify OTP
                </h2>
                <p className="text-gray-600 text-center mb-8">Enter the 6-digit code sent to your email</p>
                <div className="flex justify-center gap-2 mb-8">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={e => handleChange(e.target, index)}
                            disabled={loading || resendLoading}
                            className="w-10 h-12 text-center border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50"
                        />
                    ))}
                </div>
                <button
                    onClick={handleVerify}
                    disabled={loading || resendLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                        loading
                            ? "bg-indigo-400 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 hover:shadow-xl"
                    }`}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResendOtp}
                        disabled={loading || resendLoading}
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                    >
                        {resendLoading ? "Sending..." : "Resend OTP"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default VerifyResetOtp;
