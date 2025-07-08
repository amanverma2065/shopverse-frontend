import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {

    const { products, productLoading } = useAppContext();

    return (
        <div className="pt-16 bg-purple-50">
            <div className="flex flex-col items-center md:items-start mb-8 ">
                <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide mx-4 md:mx-8 mt-4 md:mt-6">
                    Best Seller
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-4 md:mx-8 mt-4 md:mt-4"></div>
            </div>
            {productLoading ? (
                <div className="flex justify-center items-center min-h-[150px]">
                    <Spinner />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6 md:mx-7 mx-4 ">
                    {products.filter((product) => (product)).slice(0, 5).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            )
            }
        </div >
    )
}

export default BestSeller