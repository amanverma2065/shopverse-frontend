import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const { addToCart, decreaseCartQuantity, cartItems, navigate, addCartLoading, decreaseLoading } = useAppContext();

    const isInCart = cartItems.some(item => item.product._id === product._id);
    const quantity = cartItems.find(item => item.product._id === product._id)?.quantity || 0;

    const handleNavigate = () => {
        const categorySlug = product.category.name.trim().replace(/[\s&]+/g, "-").toLowerCase();
        navigate(`/products/${categorySlug}/${product._id}`);
    };

    return product && (
        <div
            onClick={handleNavigate}
            className="bg-white rounded-xl border border-gray-200 cursor-pointer shadow-md "
            role="button"
            aria-label={`View details for ${product.name}`}
            data-aos="fade-up"
        >
            <div className="h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] w-full overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                />
            </div>

            <div className="p-4 space-y-2">
                <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">{product.category.name}</p>
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base line-clamp-2">
                    {product.name}
                </h3>

                <div className="flex md:items-center justify-between pt-2 flex-col md:flex-row flex-wrap">
                    <div className="space-y-1">
                        <p className="sm:text-lg text-md font-bold text-indigo-600">
                            ₹{product.offerPrice}
                            <span className="text-gray-400 sm:text-sm text-xs line-through ml-1">₹{product.price}</span>
                        </p>
                    </div>

                    <div onClick={(e) => e.stopPropagation()} className="text-indigo-500">
                        {!isInCart ? (
                            <button
                                onClick={() => addToCart(product._id, 1)}
                                disabled={addCartLoading}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${addCartLoading
                                    ? "bg-indigo-400 cursor-not-allowed opacity-70"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                    } text-white`}
                            >
                                <FaShoppingCart className="text-sm" />
                                Add
                            </button>

                        ) : (
                            <div className="flex items-center gap-2 bg-indigo-50 rounded-lg px-3 py-1.5 text-sm border border-indigo-100">
                                <button
                                    onClick={() => decreaseCartQuantity(product._id)}
                                    disabled={decreaseLoading}
                                    className={`w-6 h-6 flex items-center justify-center rounded-full border ${decreaseLoading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-indigo-600"
                                        }`}
                                >
                                    -
                                </button>

                                <span className="w-6 text-center font-medium text-indigo-600">{quantity}</span>

                                <button
                                    onClick={() => addToCart(product._id)}
                                    disabled={addCartLoading}
                                    className={`w-6 h-6 flex items-center justify-center rounded-full border ${addCartLoading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-indigo-600"
                                        }`}
                                >
                                    +
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
