import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

function AddProduct() {

    const [file, setFile] = useState();
    const [formData, setFormData] = useState({ name: "", description: "", category: "", price: "", offerPrice: "", stock: "" });

    const { name, description, category, price, offerPrice, stock } = formData;
    const [loading, setLoading] = useState(false);

    const { show, setShow, editingProduct, setEditingProduct, fetchData } = useAppContext();
    const [categories, setCategories] = useState([]);
    const { axios } = useAppContext();

    const fetchCategoryData = async () => {
        try {
            const resData = await axios.get("/api/category/allCategories");
            console.log("RESCATEGORYDATA :", resData);
            setCategories(resData.data.data);
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    };



    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loadingToast = toast.loading(editingProduct ? "Updating product..." : "Adding product...");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("categoryName", formData.category);
        data.append("price", formData.price);
        data.append("offerPrice", formData.offerPrice);
        data.append("stock", formData.stock);

        if (file) data.append("image", file);

        try {
            let res;
            if (editingProduct) {
                res = await axios.put(`/api/product/updateProduct/${editingProduct._id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                res = await axios.post("/api/product/createProduct", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            toast.dismiss(loadingToast);
            setLoading(false);

            if (res.data.success) {
                toast.success(editingProduct ? "Product updated!" : "Product added!");

                setFormData({ name: "", description: "", category: "", price: "", offerPrice: "", stock: "" });
                setFile(null);
                fetchData();

                setEditingProduct(null);
                setShow(false);
            } else {
                toast.error(res.data.message || "Operation failed.");
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            setLoading(false);
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong.");
        }
    };



    // Fetch categories only once when component mounts
    useEffect(() => {
        fetchCategoryData();
    }, []);

    // Handle setting form data based on editingProduct changes
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                description: editingProduct.description,
                category: editingProduct.category.name || editingProduct.category,
                price: editingProduct.price,
                offerPrice: editingProduct.offerPrice,
                stock: editingProduct.stock,
            });
            setFile(null);
        } else {
            setFormData({ name: "", description: "", category: "", price: "", offerPrice: "", stock: "" });
            setFile(null);
        }
    }, [editingProduct]);


    return (
        <div className="min-h-screen flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 w-full">
            <div className="lg:w-2/3 w-full max-w-4xl px-4">
                <div className="bg-white rounded-2xl shadow-2xl border-0 transform hover:scale-[1.01] transition-transform duration-300 my-6">
                    <div className="p-6 md:p-8">
                        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {show ? "Update Product" : "Add New Product"}
                        </h2>
                        <form onSubmit={onSubmitHandler} className="space-y-6">
                            <div>
                                <p className="block mb-2 font-medium text-gray-700">Product Image</p>
                                <div className="flex items-center justify-start mt-2">
                                    <label htmlFor="imageUpload" className="cursor-pointer">
                                        <input
                                            disabled={loading}
                                            onChange={(e) => {
                                                setFile(e.target.files[0]); // store a single image file
                                            }}
                                            accept="image/*"
                                            type="file"
                                            id="imageUpload"
                                            hidden
                                        />
                                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-blue-500 transition-colors duration-200">
                                            <img
                                                className="w-full h-full object-cover rounded-xl"
                                                src={
                                                    file
                                                        ? URL.createObjectURL(file)
                                                        : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                                }
                                                alt="upload preview"
                                            />
                                        </div>
                                    </label>
                                </div>

                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700" htmlFor="product-name">Product Name</label>
                                <input onChange={handleOnChange} disabled={loading} id="product-name" type="text" name='name' value={name} placeholder="Enter Product Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700" htmlFor="product-description">Product Description</label>
                                <textarea onChange={handleOnChange} disabled={loading} id="product-description" rows={4} name='description' value={description} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" placeholder="Enter Product Description"></textarea>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700" htmlFor="category">Category</label>
                                <select onChange={handleOnChange} disabled={loading} id="category" name='category' value={category} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                    <option value="">Select Category</option>
                                    {categories.map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700" htmlFor="product-price">Product Price</label>
                                    <input onChange={handleOnChange} disabled={loading} id="product-price" type="number" name='price' value={price} placeholder="Enter Price" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700" htmlFor="offer-price">Offer Price</label>
                                    <input onChange={handleOnChange} disabled={loading} id="offer-price" type="number" name='offerPrice' value={offerPrice} placeholder="Enter Offer Price" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700" htmlFor="stock">Stock</label>
                                <input onChange={handleOnChange} disabled={loading} id="stock" type="number" name='stock' value={stock} placeholder="Enter Stock Quantity" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required />
                            </div>

                            {show ? (<div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl transition-all duration-200 font-medium shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 transform hover:scale-[1.02] hover:shadow-xl"
                                        }`}
                                >
                                    {loading ? "Updating..." : "Update Product"}
                                </button>
                                <button onClick={() => { setEditingProduct(null); setShow(false) }} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transform hover:scale-[1.02] transition-all duration-200 font-medium">
                                    Cancel
                                </button>
                            </div>) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl transition-all duration-200 font-medium shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 transform hover:scale-[1.02] hover:shadow-xl"
                                        }`}
                                >
                                    {loading ? "Adding..." : "Add Product"}
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddProduct