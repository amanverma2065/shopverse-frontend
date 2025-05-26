import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from "../components/ProductCard";
import { toast } from 'react-hot-toast';

function AllProducts() {

    const { products } = useAppContext();
    const { searchQuery } = useAppContext();
    const [filteredProducts, setFilterProducts] = useState([]);
    

    useEffect(() => {
      if(searchQuery.length > 0){
        setFilterProducts(products.filter(
          product => product.name.trim().replace(" ", "").toLowerCase().includes(searchQuery.trim().replace(" ", "").toLowerCase())
        ))
      }
      else{
        setFilterProducts(products);
      }
    }, [products, searchQuery]);

  return (
    <div className='pt-16 pb-10 flex flex-col px-6 bg-purple-50'>
        <div className="flex flex-col items-center md:items-start mb-8 ">
                <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide mx-2">
                    All Products
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-4 md:mx-8 mt-4 md:mt-4"></div>
            </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
          {filteredProducts.filter( (product) => product).map( (product, index) => (
            <ProductCard product={product} key={product._id}/>
          ))}
        </div>

    </div>
  )
}

export default AllProducts