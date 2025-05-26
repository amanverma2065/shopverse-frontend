import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import AddProduct from "./AddProduct";

function ProductList() {

    const { products, setProducts, axios, show, setShow, setEditingProduct, } = useAppContext();

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete(`/api/product/deleteProduct/${productId}`);
            if (res.data.success) {
                toast.success("Product deleted");
                // Remove the deleted category from the UI
                setProducts((prev) => prev.filter((product) => product._id !== productId));
            } else {
                toast.error(res.data.message || "Failed to delete Product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            const message = error.response?.data?.message || "Error deleting product";
            toast.error(message);
        }
    };

    return (
        <>
            {show ? (<AddProduct />) : (<div className="flex-1 py-10 flex flex-col justify-between bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="w-full md:p-10 p-4">
                    <div className="flex flex-col items-center md:items-start mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide">
                            All Products
                        </h1>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-4"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden ">
                                <div className="relative">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-48 object-contain"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                                        <span className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium">
                                            {product.category.name}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Price</span>
                                            <span className="text-lg font-bold text-gray-800">₹{product.offerPrice}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm text-gray-500">Stock</span>
                                            <span className="text-lg font-bold text-gray-800">{product.stock}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => {setEditingProduct(product); setShow(true)}} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 font-medium">
                                            Update
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-all duration-200 font-medium">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>)}
        </>
    );
}

export default ProductList