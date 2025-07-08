import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";

function Cart() {
    const { user, cartItems, navigate, cartAmount, deleteFromCart, addToCart, cartQuantity, decreaseCartQuantity, axios, setShippingAddress, paymentType, setPaymentType, placeOrder, orderAmount} = useAppContext();
    const [address, setAddress] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();
    const [loading, setLoading] = useState(false);

    const getAddress = async () => {
        try {
            const resData = await axios.get("/api/address/getAddress");
            console.log("GET ADDRESS RES :", resData);

            if (resData.data.success) {
                setAddress(resData.data.addresses);
                // setSelectedAddress(resData.data.addresses[0]);
            }
            else {
                toast.error("Cannot add address!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

    const handleDeleteAddress = async (addressId) => {
        try {
            const resData = await axios.delete("/api/address/deleteAddress", { data: { addressId } });
            console.log("ADDRESS REMOVE RES :", resData);

            if (resData.data.success) {
                toast.success("Address removed");
                getAddress();
            }
            else {
                toast.error(resData.data.message || "Unable to remove address");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
            return;
        }
    }

    // Load Razorpay checkout script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleOnlinePayment = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }

        const res = await loadRazorpayScript();
        if (!res) {
            toast.error("Failed to load Razorpay SDK. Are you online?");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Processing payment...");

        try {
            const response = await axios.post("/api/order/createOrder", {
                addressId: selectedAddress._id,
                paymentType: "Online",
                orderAmount,
            });

            if (!response.data.success) {
                toast.error(response.data.message || "Failed to create order");
                return;
            }

            const {
                orderId,
                razorpayOrderId,
                amount,
                key,
                currency,
            } = response.data;

            const options = {
                key,
                amount,
                currency,
                name: "Shop Verse",
                description: "Order Payment",
                order_id: razorpayOrderId,
                handler: async (paymentResult) => {
                    try {
                        const verifyRes = await axios.post("/api/order/verify-payment", {
                            razorpay_order_id: paymentResult.razorpay_order_id,
                            razorpay_payment_id: paymentResult.razorpay_payment_id,
                            razorpay_signature: paymentResult.razorpay_signature,
                            orderId,
                        });

                        if (verifyRes.data.success) {
                            toast.success("Payment successful!", { id: loadingToast });
                            navigate("/my-orders");
                        } else {
                            toast.error("Payment verification failed", { id: loadingToast });
                        }
                    } catch (error) {
                        toast.error(error.response?.data?.message || "Payment verification failed", { id: loadingToast });
                    } finally {
                        setLoading(false);
                        toast.dismiss(loadingToast);
                    }
                },
                prefill: {
                    email: user.email,
                },
                theme: {
                    color: "#6366f1",
                },
                modal: {
                    ondismiss: () => {
                        toast.dismiss(loadingToast);
                        setLoading(false);
                        toast.error("Payment cancelled");
                    },
                },
            };


            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            toast.error("Payment initiation failed");
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    useEffect(() => {
        getAddress()
    }, []);

    // products.length > 0 && cartItems

    return (cartQuantity > 0) ? (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-3 ">
            <div className='flex-1 max-w-4xl'>
                <div className="flex flex-col items-start mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Shopping Cart
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                        <span className="text-sm font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                            {cartQuantity} Items
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-[1fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border my-6 rounded-xl shadow-md border-indigo-100">
                        <div className="flex flex-col justify-center gap-3 mx-3">
                            <div onClick={() => { navigate(`/products/${item.product.category.name.trim().replace(/[\s&]+/g, "-").toLowerCase()}/${item.product._id}`); }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
                            </div>
                            <div>
                                <p className="block md:block font-semibold">{item.product.name}</p>
                                <div className="font-normal text-gray-500/70">

                                    <div className='flex items-center mb-3 mt-2'>
                                        {/* <p>Qty:</p> */}
                                        <div className="flex items-center justify-center gap-2 bg-indigo-500/25 rounded select-none px-2 py-1 text-xs sm:text-sm">
                                            <button disabled={loading} onClick={() => decreaseCartQuantity(item.product._id)} className="px-2">-</button>
                                            <span className="w-4 text-center">{item.quantity}</span>
                                            <button disabled={loading} onClick={() => addToCart(item.product._id)} className="px-2">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <p className="text-center">₹{item.product.offerPrice * item.quantity}</p>
                        <button onClick={() => deleteFromCart(item.product._id)} className="cursor-pointer mx-auto">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>)
                )}

                <button onClick={() => { if (loading) return; navigate("/products"); }} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] max-h-[600px] w-full bg-gradient-to-br from-white to-indigo-200 p-6 max-md:mt-16 rounded-xl shadow-lg border border-indigo-100">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Order Summary</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full my-4"></div>

                <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-3">
                        <p className="text-gray-600 pe-2">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}` : "Select Address"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300">
                            Select
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-2 bg-white border border-indigo-100 rounded-lg shadow-xl text-sm w-full z-10">
                                {address.map((data, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 hover:bg-indigo-50 transition-colors duration-300">
                                        <p onClick={() => { setShowAddress(false); setSelectedAddress(data); setShippingAddress(data._id) }}
                                            className="text-gray-600 cursor-pointer flex-1">
                                            {data.street}, {data.city}, {data.state}
                                        </p>
                                        <button onClick={() => handleDeleteAddress(data._id)}
                                            className="text-red-500 hover:text-red-700 px-2 transition-colors duration-300">
                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <p onClick={() => navigate("/add-address")}
                                    className="text-indigo-600 text-center cursor-pointer p-3 hover:bg-indigo-50 transition-colors duration-300 border-t border-indigo-100">
                                    + Add New Address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mt-8">Payment Method</p>

                    <select onChange={(e) => (setPaymentType(e.target.value))}
                        className="w-full border border-indigo-200 bg-white px-4 py-2.5 mt-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent my-6"></div>

                <div className="text-gray-600 mt-6 space-y-3">
                    <p className="flex justify-between items-center">
                        <span className="font-medium">Price</span>
                        <span className="font-semibold">₹{cartAmount}</span>
                    </p>
                    <p className="flex justify-between items-center">
                        <span className="font-medium">Shipping Fee</span>
                        <span className="text-green-600 font-semibold">Free</span>
                    </p>
                    <p className="flex justify-between items-center">
                        <span className="font-medium">Tax (2%)</span>
                        <span className="font-semibold">₹{cartAmount * 2 / 100}</span>
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent my-4"></div>
                    <p className="flex justify-between items-center text-lg">
                        <span className="font-bold text-gray-700">Total Amount</span>
                        <span className="font-bold text-indigo-600">₹{orderAmount}</span>
                    </p>
                </div>

                {paymentType === "COD" ? (
                    <button onClick={placeOrder} disabled={loading}
                        className={`w-full py-3.5 mt-8 rounded-lg font-semibold text-white 
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl'}`}>
                        Place Order
                    </button>
                ) : (
                    <button onClick={handleOnlinePayment} disabled={loading}
                        className={`w-full py-3.5 mt-8 rounded-lg font-semibold text-white 
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl'}`}>
                        Proceed To Checkout
                    </button>
                )}
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                Your Cart is Empty
            </h1>
            <p className="text-gray-600 text-center mb-8">
                Looks like you haven't added anything to your cart yet
            </p>
            <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                Start Shopping
            </button>
        </div>
    )
}

export default Cart