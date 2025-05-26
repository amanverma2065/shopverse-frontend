import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
// import dummyOrders from '../assets/dummyOrders';
import toast from "react-hot-toast";

function MyOrders() {

    // const [myOrders, setMyOrders] = useState([]);
    const { axios, navigate } = useAppContext();
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderId, setOrderId] = useState();
    const [productId, setProductId] = useState();

    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetchOrders = async () => {
        try {
            const resData = await axios.get("/api/order/getUserOrders");
            console.log("ORDER DATA RES :", resData);
            setOrderProducts(resData.data.orders);
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    const handleCancellation = async (orderId, productId) => {
        try {
            const resData = await axios.post("/api/order/cancelOrderItem", { orderId, productId });
            console.log("CANCEL ITEM RES :", resData);

            if (resData.data.success) {
                toast.success("Item Cancelled!");
                fetchOrders();
            }
            else {
                toast.error("Cannot Cancel Item!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!!!!!!!!!!!!!");
        }
    }

    useEffect(() => {
        // fetchMyOrders();
        fetchOrders();
    }, []);



    return (orderProducts.length > 0) ? (<div className="mt-16 pb-16 md:px-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase">My Orders</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
        </div>
        {/* Confirmation Modal */}


        {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Order</h3>
                    <p className="text-gray-600 mb-6">Are you sure you want to cancel this order?</p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            No
                        </button>
                        <button
                            onClick={() => { handleCancellation(orderId, productId); setShowConfirmation(false) }}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                        >
                            Yes, Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}

        {orderProducts.map((order, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden transform hover:scale-[1.01] transition-all duration-300 ">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 text-sm md:text-base">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Order ID</span>
                            <span className="font-semibold text-gray-700">{order._id}</span>

                            <span className="text-gray-500 font-medium mt-4">Order Status</span>
                            <span className={`px-3 py-1 rounded-full text-center text-sm font-medium w-24 ${order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                                order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" :
                                    "bg-yellow-100 text-yellow-700"
                                }`}>
                                {order.orderStatus}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Payment Method</span>
                            <span className="font-semibold text-gray-700">{order.paymentType}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Total Amount</span>
                            <span className="font-semibold text-gray-700">₹{order.totalPrice}</span>
                        </div>
                    </div>
                </div>

                {order.items.map((item, index) => (
                    <div key={index} className={`p-4 md:p-6 ${index !== order.items.length - 1 && "border-b border-gray-400"}`}>
                        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 text-sm md:text-base">
                            <div className="flex items-center gap-6">
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.product.name}</h3>
                                    {/* <p className="text-gray-600">Category: {item.product.category}</p> */}
                                    <p className="text-gray-500 text-sm mb-1">Quantity: {item.quantity || "1"}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.itemOrderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                                    item.itemOrderStatus === "Shipped" ? "bg-blue-100 text-blue-700" :
                                        "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {item.itemOrderStatus}
                                </span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Amount</p>
                                <p className="font-semibold text-gray-800">₹{item.product.offerPrice * item.quantity}</p>
                            </div>

                        </div>
                        <div className="flex justify-between md:items-center mt-4 flex-col sm:flex-row gap-2">
                            <p className="text-gray-500 text-sm">
                                <span className='text-zinc-800'>Ordered:</span> {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            {item.itemOrderStatus === "Delivered" ? (<p className="text-gray-500 text-sm">
                                <span className='text-zinc-800'>Delivered:</span> {new Date(item.itemDeliveryDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>) : (
                                <p className="text-gray-500 text-sm">
                                    <span className='text-zinc-800'>Arrive:</span> {new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 7)).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                            {item.itemOrderStatus !== "Cancelled" && item.itemOrderStatus !== "Delivered" && (
                                <button
                                    className="w-auto md:px-4 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-xs self-start sm:self-auto"
                                    onClick={() => {
                                        // handleCancellation(order._id, item.product._id)
                                        setShowConfirmation(true);
                                        setOrderId(order._id);
                                        setProductId(item.product._id);
                                    }}
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    </div>

                ))
                }
            </div >
        ))}
    </div >) : (<div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            No Orders Found
        </h1>
        <p className="text-gray-600 text-center mb-8">
            Looks like you haven't ordered anything
        </p>
        <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
            Start Shopping
        </button>
    </div>)
}

export default MyOrders