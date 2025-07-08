import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import Spinner from "./Spinner";

function Category() {
    const { navigate, axios, categories, setCategories } = useAppContext();
    const [categoryLoading, setCategoryLoading] = useState(false);

    const fetchData = async () => {
        setCategoryLoading(true); // Start loading
        try {
            const resData = await axios.get("/api/category/allCategories");
            console.log("RESDATA :", resData);
            setCategories(resData.data.data);
        } catch (error) {
            toast.error("Failed to load categories");
        } finally {
            setCategoryLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="pt-16 bg-gradient-to-br from-white to-purple-50" data-aos="fade-up">
            <div className="flex flex-col items-center md:items-start mb-8">
                <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide mx-4 md:mx-8 mt-4 md:mt-6">
                    Explore Categories
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-4 md:mx-8 mt-4 md:mt-4"></div>
            </div>

            {categoryLoading ? (
                <div className="flex justify-center items-center min-h-[150px]">
                    <Spinner />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mx-4 md:mx-8 mt-4 md:mt-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`/products/${category.name.toLowerCase()}`)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') navigate(`/products/${category.name.toLowerCase()}`);
                            }}
                            className="flex items-center gap-2 bg-indigo-200 hover:bg-indigo-300 text-gray-800 font-bold py-3 px-6 md:py-4 md:px-10 rounded-lg transition-all duration-300 ease-in-out text-sm md:text-base shadow-lg hover:shadow-xl"
                        >
                            <p className="text-base font-semibold text-gray-800">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
