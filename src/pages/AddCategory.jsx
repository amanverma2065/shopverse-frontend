import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

function AddCategory() {

    const [formData, setFormData] = useState({ name: "", description: "" });
    const { name, description } = formData;
    const [loading, setLoading] = useState(false);

    const { axios } = useAppContext();

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

        setLoading(true);
        const loadingToast = toast.loading("Adding category...");

        try {
            const resData = await axios.post("/api/category/createCategory", { name, description });
            toast.dismiss(loadingToast);

            console.log("RESDATA :", resData);
            if (resData.data.success) {
                toast.success("Category added successfully");
            } else {
                toast.error(resData.data.message);
                console.log("Else error: ", resData.data.message);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.log("Catch error object", error);
            const backendMessage = error.response?.data?.message || "Unable to add new category";
            toast.error(backendMessage);
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }

        setFormData({ name: "", description: "" });
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-indigo-100">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Add Category
                    </h2>
                    <form className="space-y-6" onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleOnChange}
                                 disabled={loading}
                                className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50 disabled:opacity-60"
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Category Description
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                name="description"
                                value={description}
                                onChange={handleOnChange}
                                 disabled={loading}
                                className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50 resize-none disabled:opacity-60"
                                placeholder="Enter category description"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 hover:shadow-xl'
                                }`}
                        >
                           {loading ? "Adding..." : "Add Category"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategory