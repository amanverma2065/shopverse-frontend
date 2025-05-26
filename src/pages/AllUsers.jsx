import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';

function AllUsers() {

    const { axios, getUserOrderById, navigate } = useAppContext();
    const [allUsers, setAllUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const resData = await axios.get("/api/order/getAllUsers");
            console.log("ALL USER RES :", resData);

            if (resData.data.success) {
                toast.success("All Users")
                setAllUsers(resData.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
            return;
        }
    }

    useEffect( () => {
        fetchUsers();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="flex flex-col items-center md:items-start mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide">
                        All Users
                    </h1>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {allUsers.map((user) => (
                        <div 
                            key={user._id} 
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden p-6 hover:shadow-2xl"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {`${user.firstName} ${user.lastName}`}
                                        </h3>
                                    </div>
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium inline-block w-fit">
                                        ID: {user._id}
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        getUserOrderById(user._id);
                                        navigate("/admin/orders");
                                        localStorage.setItem("currentUserId", user._id);
                                    }}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-medium"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllUsers