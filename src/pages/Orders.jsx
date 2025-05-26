import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Orders() {

    const { ordersById, axios, getUserOrderById } = useAppContext();
    console.log("OrderById", ordersById);

    const currentUserId = localStorage.getItem("currentUserId");

    const handleCancellation = async (orderId, productId, userId) => {
        try {
            const resData = await axios.post(`/api/order/cancelOrderItemByAdmin/${userId}`, { orderId, productId });
            console.log("CANCEL ITEM RES :", resData);

            if (resData.data.success) {
                toast.success("Item Cancelled!");
                getUserOrderById(userId);
            }
            else {
                toast.error("Cannot Cancel Item!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

    const handleStatusUpdate = async (orderId, productId, userId, newStatus) => {
        try {
            const resData = await axios.put("/api/order/updateOrderItemStatusByAdmin", {
                orderId,
                productId,
                newStatus,
            });

            if (resData.data.success) {
                toast.success("Status updated!");
                getUserOrderById(userId);
            } else {
                toast.error("Update failed.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while updating status.");
        }
    };

    useEffect(() => {
        if (currentUserId) {
            getUserOrderById(currentUserId);
        }
    }, [currentUserId]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="flex flex-col items-center md:items-start mb-12 relative">
                    <div className="flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-tight">
                            Orders
                        </h1>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-3 transform transition-all duration-300 hover:scale-110"></div>
                    </div>
                    <div className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-30 -top-32 -left-32"></div>
                </div>

                <div className="space-y-8">
                    {ordersById.map((order, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-indigo-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 sm:p-8 px-2 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6">
                                    <div className="bg-white/50 sm:p-4 px-2 py-4 rounded-xl shadow-sm">
                                        <p className="text-indigo-600 font-medium mb-1">Order ID</p>
                                        <p className="font-semibold text-sm text-gray-800">{order._id}</p>
                                    </div>
                                    <div className="bg-white/50 sm:p-4 px-2 py-4 rounded-xl shadow-sm">
                                        <p className="text-indigo-600 font-medium mb-2">Order Status</p>
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                                            order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" :
                                                "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                    <div className="bg-white/50 sm:p-4 px-2 py-4 rounded-xl shadow-sm">
                                        <p className="text-indigo-600 font-medium">Total Amount</p>
                                        <p className="font-semibold text-gray-800">₹{order.totalPrice}</p>
                                    </div>
                                </div>

                                <div className="mt-6 bg-white/50 sm:p-4 px-2 py-4 rounded-xl shadow-sm">
                                    <p className="text-indigo-600 font-medium mb-1">Shipping Address</p>
                                    <p className="text-gray-700">{order.address.street}, {order.address.city}, {order.address.state}</p>
                                </div>
                            </div>

                            {order.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="p-8 border-t border-indigo-100 bg-white/50">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                        <div className="flex flex-col items-start gap-6 w-full md:w-auto">
                                            <div className="bg-white  rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-contain rounded-xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.product.name}</h3>
                                                <p className="text-indigo-600 font-medium">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>

                                        {item.itemOrderStatus !== "Cancelled" && (
                                            <div className="bg-white/80">
                                                <div className="flex items-start md:items-center gap-3">
                                                    <p className="text-indigo-600 font-medium">Payment Status</p>
                                                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${item.itemPaymentStatus === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-blue-100 text-blue-700"
                                                        }`}>
                                                        {item.itemPaymentStatus}
                                                    </span>
                                                </div>
                                                {item.itemOrderStatus === "Delivered" && (
                                                    <div className="mt-3 bg-indigo-50 p-3 rounded-lg text-sm text-indigo-600">
                                                        Delivered on {new Date(item.itemDeliveryDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {item.itemOrderStatus !== "Cancelled" ? (
                                            <div className="bg-white/80 rounded-xl shadow-sm">
                                                <div className="flex flex-col gap-6 w-full md:w-auto">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <p className="text-indigo-600 font-medium">Order Status</p>
                                                        <select
                                                            className="w-full md:w-auto border border-indigo-200 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                                                            value={item.itemOrderStatus}
                                                            onChange={(e) =>
                                                                handleStatusUpdate(order._id, item.product._id, order.address.userId, e.target.value)
                                                            }
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </div>
                                                    {item.itemOrderStatus !== "Delivered" && (
                                                        <button
                                                            onClick={() => handleCancellation(order._id, item.product._id, order.address.userId)}
                                                            className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                                        >
                                                            Cancel Item
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="px-6 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium">
                                                Cancelled
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="bg-indigo-50 py-4 px-8 text-sm text-indigo-600">
                                Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders