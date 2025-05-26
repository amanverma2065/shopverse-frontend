import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useAppContext } from '../context/AppContext';

function ResetPassword() {

  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const { newPassword, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { axios, navigate } = useAppContext();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const resetEmail = JSON.parse(localStorage.getItem("Reset-Email"));
    if (!resetEmail) {
      toast.error("Email missing");
      return navigate("/login");
    }

    const toastId = toast.loading("Resetting password...");
    setLoading(true);

    try {
      const res = await axios.put("/api/reset-password/update-password", {
        email: resetEmail,
        ...formData
      });

      if (res.data.success) {
        toast.success("Password Changed Successfully", { id: toastId });
        localStorage.removeItem("Reset-Email");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Password Reset failed!", { id: toastId });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Password Reset failed!";
      toast.error(msg, { id: toastId });
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
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="flex">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                name="newPassword"
                className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={newPassword}
                onChange={handleOnChange}
                placeholder="Enter new Password"
                required
                disabled={loading}
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
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="flex">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Enter Confirm Password"
                required
                disabled={loading}
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg ${loading
                ? "bg-indigo-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 hover:shadow-xl"
              }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;
