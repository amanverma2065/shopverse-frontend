import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

function AllCategories() {
    const [categories, setCategories] = useState([]);
    const { axios } = useAppContext();

    const fetchData = async () => {
        try {
            const resData = await axios.get("/api/category/allCategories");
            console.log("RESDATA :", resData);
            setCategories(resData.data.data);
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const res = await axios.delete(`/api/category/deleteCategory/${categoryId}`);
            if (res.data.success) {
                toast.success("Category deleted");
                // Remove the deleted category from the UI
                setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
            } else {
                toast.error(res.data.message || "Failed to delete category");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            const message = error.response?.data?.message || "Error deleting category";
            toast.error(message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="flex flex-col items-center md:items-start mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide">
                        All Categories
                    </h1>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {categories.map((category) => (
                        <div 
                            key={category._id} 
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden p-6 hover:shadow-2xl"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium">
                                        Products: {category.products?.length || 0}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                                    >
                                        <MdDelete className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllCategories;
