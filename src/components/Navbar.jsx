import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaUserAlt } from "react-icons/fa";
import websiteLogo from "../assets/Picsart_25-05-25_17-01-48-426.png";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, navigate, setSearchQuery, searchQuery, logout, cartQuantity } = useAppContext();


    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery]);

    

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 ">

            <NavLink to="/" onClick={() => setOpen(false)} className="transform hover:scale-105 transition-transform duration-300">
                <img className="w-[140px] md:w-[160px]" src={websiteLogo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-10">
                <NavLink to="/" className={({ isActive }) =>
                    `text-gray-700 hover:text-indigo-600 transition-all duration-300 no-underline text-[15px] font-medium ${isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                    }`
                }>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) =>
                    `text-gray-700 hover:text-indigo-600 transition-all duration-300 no-underline text-[15px] font-medium ${isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                    }`
                }>All Product</NavLink>
                <NavLink to="/contact-us" className={({ isActive }) =>
                    `text-gray-700 hover:text-indigo-600 transition-all duration-300 no-underline text-[15px] font-medium ${isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                    }`
                }>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border-2 px-4 py-1.5 rounded-full border-indigo-400 transition-colors duration-300">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1 w-full bg-transparent outline-none placeholder-gray-400" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-500">
                        <path d="M10.836 10.615 15 14.695" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="animate-bounce absolute -top-2 -right-3 text-xs text-white bg-indigo-600 w-[20px] h-[20px] rounded-full flex items-center justify-center shadow-md">{cartQuantity}</button>
                </div>

                {!user ?
                    (<button onClick={() => { setOpen(false); navigate("/login") }} className="cursor-pointer px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Login
                    </button>) :
                    (<div className="relative group inline-block">
                        <FaUserAlt className="w-7 h-7 text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors duration-300" />

                        <ul className="absolute top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white shadow-lg border border-indigo-100 py-2 w-36 rounded-lg text-sm z-40 transform transition-all duration-300">
                            <li onClick={() => navigate("/my-orders")} className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors duration-300">
                                My Orders
                            </li>
                            <li onClick={logout} className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors duration-300">
                                Logout
                            </li>
                        </ul>
                    </div>)
                }
            </div>

            <div className="flex items-center gap-6 sm:hidden">
                <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-600 w-[20px] h-[20px] rounded-full flex items-center justify-center shadow-md">{cartQuantity}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden p-1 hover:bg-indigo-50 rounded-lg transition-colors duration-300">
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                        <rect width="21" height="1.5" rx=".75" fill="currentColor" />
                        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="currentColor" />
                        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-xl py-4 flex-col items-start gap-3 px-6 text-sm md:hidden z-40 border-t border-indigo-100`}>
                    <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) =>
                        `w-full px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 no-underline rounded-lg ${isActive ? "text-indigo-600 bg-indigo-50" : ""
                        }`
                    }>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)} className={({ isActive }) =>
                        `w-full px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 no-underline rounded-lg ${isActive ? "text-indigo-600 bg-indigo-50" : ""
                        }`
                    }>All Product</NavLink>
                    {user &&
                        <NavLink to="/my-orders" onClick={() => setOpen(false)} className={({ isActive }) =>
                        `w-full px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 no-underline rounded-lg ${isActive ? "text-indigo-600 bg-indigo-50" : ""
                        }`
                    }>My Orders</NavLink>
                    }
                    <NavLink to="/contact-us" onClick={() => setOpen(false)} className={({ isActive }) =>
                        `w-full px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 no-underline rounded-lg ${isActive ? "text-indigo-600 bg-indigo-50" : ""
                        }`
                    }>Contact</NavLink>

                    {/* setShowUserLogin(true);  */}

                    {!user ?
                        (<button onClick={() => { setOpen(false); navigate("/login") }} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                            Login
                        </button>) :
                        (<button onClick={() => {logout(); setOpen(false)}} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                            Logout
                        </button>)
                    }
                </div>
            )

            }

        </nav>
    )
}

export default Navbar;