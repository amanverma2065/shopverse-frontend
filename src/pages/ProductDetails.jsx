import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

function ProductDetails() {

    const { products, navigate, addToCart, user } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const selectedProduct = products.find((item) => item._id === id);

    useEffect(() => {
        if (selectedProduct) {
            const related = products
                .filter(item =>
                    item._id !== selectedProduct._id &&
                    item.category.name === selectedProduct.category.name
                )
                .slice(0, 5);
            setRelatedProducts(related);
        }
    }, [selectedProduct, products]);

    useEffect(() => {
        setThumbnail(selectedProduct?.imageUrl || null);
    }, [selectedProduct]);

    if (!selectedProduct) return null;


    return selectedProduct && (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6">

            <div className="flex flex-col sm:flex-row gap-16 mt-4">
                <div className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] border border-gray-500/30 rounded overflow-hidden flex items-center justify-center bg-white">
                    <img
                        src={thumbnail}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="text-sm w-full sm:w-1/2">
                    <h1 className="text-3xl font-medium">{selectedProduct.name}</h1>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ₹{selectedProduct.price}</p>
                        <p className="text-2xl font-medium">MRP: ₹{selectedProduct.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <p>{selectedProduct.description}</p>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => { user ? addToCart(selectedProduct._id) : toast.error("Login Required!") }} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => { user ? navigate("/cart") : toast.error("Login Required!") }} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-20'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-2xl font-medium uppercase'>Related Products</p>
                    <div className='w-20 h-0.5 bg-black rounded-full'></div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 mt-6 w-full'>
                    {relatedProducts.filter((product) => product).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
                <button onClick={() => { navigate("/products"); }} className="px-5 py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition mt-6" >
                    See More
                </button>
            </div>
        </div>
    );
}

export default ProductDetails