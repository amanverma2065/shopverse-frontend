
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import AddAddress from "./pages/AddAddress.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import { useAppContext } from "./context/AppContext.js";
import AdminLayout from "./pages/AdminLayout.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProductList from "./pages/ProductList.jsx";
import Orders from "./pages/Orders.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import AllCategories from "./pages/AllCategories.jsx";
import { Navigate } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoutes.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyResetOtp from "./pages/VerifyResetOtp.jsx";
import ResetEmail from "./pages/ResetEmail.jsx";
import Contact from "./pages/Contact.jsx";

function App() {

  // const isAdmin = useLocation().pathname.includes("admin");
  // const { showUserLogin } = useAppContext();
  const { admin, user } = useAppContext();

  return (
    <>
      {admin ? null : <Navbar />}
      {/* { showUserLogin ? <Login/> : null } */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user && !admin ? <Login /> : <Navigate to="/" />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-email" element={<ResetEmail />} />

        {/* Protected Routes for User */}


        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/add-address" element={
          <ProtectedRoute>
            <AddAddress />
          </ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />
        <Route path="/contact-us" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />


        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AllUsers />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="category-list" element={<AllCategories />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
          
        </Route>

      </Routes>
      {admin ? null : <Footer />}

    </>
  );
}

export default App;


// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Footer from "./components/Footer.jsx";
// import Login from "./components/Login.jsx";
// import AllProducts from "./pages/AllProducts.jsx";
// import ProductCategory from "./pages/ProductCategory.jsx";
// import ProductDetails from "./pages/ProductDetails.jsx";
// import Cart from "./pages/Cart.jsx";
// import AddAddress from "./pages/AddAddress.jsx";
// import MyOrders from "./pages/MyOrders.jsx";
// import { useAppContext } from "./context/AppContext.js";
// import AdminLayout from "./pages/AdminLayout.jsx";
// import AddProduct from "./pages/AddProduct.jsx";
// import ProductList from "./pages/ProductList.jsx";
// import Orders from "./pages/Orders.jsx";
// import VerifyOtp from "./pages/VerifyOtp.jsx";
// import AddCategory from "./pages/AddCategory.jsx";
// import AllCategories from "./pages/AllCategories.jsx";
// import toast from "react-hot-toast";
// // import Signup from "./components/Signup.jsx";
// // import { useAppContext } from "./context/AppContext.js";

// function App() {

//   // const isAdmin = useLocation().pathname.includes("admin");
//   // const { showUserLogin } = useAppContext();
//   const { admin, user } = useAppContext();

//   return (
//     <>
//       {admin ? null : <Navbar />}
//       {/* { showUserLogin ? <Login/> : null } */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/products" element={<AllProducts />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/add-address" element={<AddAddress />} />
//         <Route path="/my-orders" element={<MyOrders />} />
//         <Route path="/products/:category" element={<ProductCategory />} />
//         <Route path="/products/:category/:id" element={<ProductDetails />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />


//         <Route path="/admin" element={admin ? <AdminLayout /> : null} >
//           <Route index element={admin ? <AddCategory /> : null} />
//           <Route path="category-list" element={<AllCategories />} />
//           <Route path="add-product" element={<AddProduct />} />
//           <Route path="product-list" element={<ProductList />} />
//           <Route path="orders" element={<Orders />} />
//         </Route>
//         {/* <Route path="/signup" element={<Signup/>} /> */}

//       </Routes>

//       {admin ? null : <Footer />}

//     </>
//   );
// }

// export default App;