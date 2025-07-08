import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { dummyProduct } from "../assets/dummyProduct";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    const [admin, setAdmin] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [show, setShow] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartAmount, setCartAmount] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [paymentType, setPaymentType] = useState("COD");
    const [orderAmount, setOrderAmount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(false);
    const [ordersById, setOrdersById] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [addCartLoading, setAddCartLoading] = useState(false);
    const [decreaseLoading, setDecreaseLoading] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUserData = localStorage.getItem("userData");

        if (savedToken && savedUserData) {
            const parsedUser = JSON.parse(savedUserData);
            if (parsedUser.accountType === "user") {
                setUser(parsedUser);
                console.log("LOCAL USER :", parsedUser);
                if (window.location.pathname === "/login" || window.location.pathname === "/verify-otp") {
                    navigate("/"); // only redirect from login/otp page
                }
            } else if (parsedUser.accountType === "admin") {
                setAdmin(parsedUser);
                console.log("LOCAL ADMIN :", parsedUser);
                if (!window.location.pathname.startsWith("/admin")) {
                    navigate("/admin");
                }
            }
        }
        setLoading(false);
    }, [navigate]);


    // const fetchProducts = async() => {
    //     setProducts(dummyProduct);
    // }

    const fetchData = async () => {
        setProductLoading(true); // Start loading
        try {
            const resData = await axios.get("/api/product/allProduct");
            console.log("RESPRODUCTDATA :", resData);
            setProducts(resData.data.data);
        } catch (error) {
            toast.error("Failed to load categories");
        } finally {
            setProductLoading(false); // Stop loading regardless of success or failure
        }
    };

    // const addToCart = (itemId) => {
    //     let cartData = structuredClone(cartItems);

    //     if(cartData[itemId]){
    //         cartData[itemId] += 1;
    //     }
    //     else{
    //         cartData[itemId] = 1;
    //     }
    //     setCartItems(cartData);
    //     toast.success("Added to cart");
    // }

    // const addToCart = async (productId, quantity = 1) => {
    //     try {
    //         const resData = await axios.post("/api/cart/addToCart", { productId, quantity: Number(quantity) });
    //         console.log("ADDTOCARTRESPONSE :", resData);

    //         if (resData.data.success) {
    //             toast.success("Added to cart");
    //             getCartCount();
    //             getCartItems();
    //         }
    //         else {
    //             toast.error(resData.data.message || "Unable to add item");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         console.log(error.response?.data?.message);
    //         // toast.error(error.response?.data?.message || "Something went wrong.");
    //         toast.error("Login Required!");
    //         return;
    //     }
    // }

    const addToCart = async (productId, quantity = 1) => {
        setAddCartLoading(true); // Start loading
        const loadingToastId = toast.loading("Adding to cart..."); // Show loading toast

        try {
            const resData = await axios.post("/api/cart/addToCart", {
                productId,
                quantity: Number(quantity),
            });
            console.log("ADDTOCARTRESPONSE :", resData);

            if (resData.data.success) {
                toast.success("Added to cart", { id: loadingToastId }); // Replace loading toast with success
                getCartCount();
                getCartItems();
            } else {
                toast.error(resData.data.message || "Unable to add item", { id: loadingToastId }); // Replace with error
            }
        } catch (error) {
            console.error(error);
            toast.error("Login Required!", { id: loadingToastId });
        } finally {
            setAddCartLoading(false); // End loading
        }
    };



    const decreaseCartQuantity = async (productId) => {
        setDecreaseLoading(true); // Start loading
        const toastId = toast.loading("Removing item..."); // Show loading toast

        try {
            const resData = await axios.post("/api/cart/decreaseCartQuantity", { productId });
            console.log("CART DECREASE RES:", resData);

            if (resData.data.success) {
                toast.success("Item removed", { id: toastId }); // Replace loading toast with success
                getCartAmount();
                getCartCount();
                getCartItems();
            } else {
                toast.error(resData.data.message || "Unable to remove item", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.", { id: toastId });
        } finally {
            setDecreaseLoading(false); // End loading
        }
    };


    const deleteFromCart = async (productId) => {
        try {
            const resData = await axios.delete("/api/cart/removeFromCart", { data: { productId } });
            console.log("CART ITEM REMOVE RES :", resData);

            if (resData.data.success) {
                toast.success("Item removed");
                getCartAmount();
                getCartCount();
                getCartItems();
            }
            else {
                toast.error(resData.data.message || "Unable to remove item");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
            return;
        }
    };

    const getCartCount = async () => {
        try {
            const resData = await axios.get("/api/cart/getCartQuantity");
            console.log("CART QUANTITY RES :", resData);
            setCartQuantity(resData.data.totalQuantity);
        } catch (error) {
            if (error.response?.status === 404) {
                // New user, cart doesn't exist yet. Do nothing.
                console.log("Cart not found for quantity. Likely new user.");
            } else {
                console.error("Failed to get cart quantity:", error);
            }
        }
    }

    const getCartAmount = async () => {
        try {
            const resData = await axios.get("/api/cart/getCartAmount");
            console.log("CART Amount RES :", resData);
            setCartAmount(resData.data.totalAmount);
            setOrderAmount(Math.floor(resData.data.totalAmount + (resData.data.totalAmount * 0.02)));
        } catch (error) {
            console.log(error);
        }
    }

    const getCartItems = async () => {
        try {
            const resData = await axios.get("/api/cart/viewCart");
            console.log("CART DATA RES :", resData);
            setCartItems(resData.data.cart.items);
            console.log("cartItems :", resData.data.cart.items)
            getCartAmount();
            getCartCount();
        } catch (error) {
            if (error.response?.status === 404) {
                // New user, cart doesn't exist. Don't toast error.
                console.log("Cart not found. Likely new user.");
            } else {
                console.error("Unexpected error in getCartItems:", error);
                toast.error("Something went wrong!");
            }
        }
    }

    const logout = async () => {
        try {
            const resData = await axios.post("/api/auth/logout");
            console.log("LOGOUT RES :", resData);
            if (resData.data.success) {
                sessionStorage.setItem("justLoggedOut", "true");
                setAdmin(null);
                setUser(null);
                setCartQuantity(0);
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                toast.success("Logged Out")
                navigate("/");
            }
            else {
                toast.error("Cannot logout!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

    const placeOrder = async () => {
        const toastId = toast.loading("Placing your order...");
        try {
            const resData = await axios.post("/api/order/createOrder", {
                addressId: shippingAddress,
                paymentType: paymentType,
                orderAmount: orderAmount
            });

            console.log("ORDER PLACE RES :", resData);

            if (resData.data.success) {
                toast.success("Order Placed", { id: toastId });
                setCartItems([]);
                setCartQuantity(0);
                setCartAmount(0);
                setOrderAmount(0);
                navigate("/my-orders");
            } else {
                toast.error("Cannot place order!", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", { id: toastId });
        } finally {
            toast.dismiss(toastId);
        }
    };


    const getUserOrderById = async (userId) => {
        try {
            const resData = await axios.get(`/api/order/getOrdersByUserId/${userId}`);
            console.log("ADMIN ORDER RES :", resData);

            if (resData.data.success) {
                toast.success("Order Details...");
                setOrdersById(resData.data.data);
            }
            else {
                toast.error("Unable to load orders!");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
            return;
        }
    }




    useEffect(() => {
        fetchData()
        if (user) {
            getCartItems()
            getCartCount()
        }
    }, [user]);



    const values = {
        navigate,
        user,
        setUser,
        admin,
        setAdmin,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        cartItems,
        setCartItems,
        addToCart,
        decreaseCartQuantity,
        // removeCart,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        deleteFromCart,
        // buyNow,
        axios,
        token,
        logout,
        show,
        setShow,
        editingProduct,
        setEditingProduct,
        fetchData,
        cartQuantity,
        setCartQuantity,
        getCartItems,
        cartAmount,
        shippingAddress,
        setShippingAddress,
        paymentType,
        setPaymentType,
        placeOrder,
        orderAmount,
        setOrderAmount,
        loading,
        ordersById,
        setOrdersById,
        getUserOrderById,
        currentUserId,
        setCurrentUserId,
        productLoading,
        setProductLoading,
        categories,
        setCategories,
        addCartLoading,
        setAddCartLoading,
        decreaseLoading,
        setDecreaseLoading
    }

    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}