import React from 'react'
import { AiFillProduct } from "react-icons/ai";
import { FaList } from "react-icons/fa6";
import { MdBookmarkBorder } from "react-icons/md";
import { useAppContext } from '../context/AppContext';
import { NavLink, Outlet } from 'react-router-dom';
import websiteLogo from "../assets/Picsart_25-05-25_17-01-48-426.png";

function AdminLayout() {

    const { logout  } = useAppContext();

    const addProductIcon = (
        <AiFillProduct />
    );

    const productListIcon = (
        <FaList />
    );

    const ordersIcon = (
        <MdBookmarkBorder />
    );

    const sidebarLinks = [
        { name: "All Users", path: "/admin", icon: ordersIcon },
        { name: "Add Category", path: "/admin/add-category", icon: addProductIcon },
        { name: "Category List", path: "/admin/category-list", icon: productListIcon },
        { name: "Add Product", path: "/admin/add-product", icon: addProductIcon },
        { name: "Product List", path: "/admin/product-list", icon: productListIcon },
        // { name: "Orders", path: "/admin/orders", icon: ordersIcon },
        
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <NavLink to="/admin">
                    <img className="w-[140px] md:w-[160px]" src={websiteLogo} alt="dummyLogoColored" />
                </NavLink>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-56 w-16 border-r text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item, index) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/admin"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout