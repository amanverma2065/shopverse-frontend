import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function ProductCategory() {

    const { products, categories } = useAppContext();
    const { category } = useParams();

    const searchCategory = categories.find((item) => item.name.toLowerCase() === category);

    const filteredProducts = products.filter((product) => product.category.name.trim().replace(/[\s&]+/g, "-").toLowerCase() === category)

    return (
        <div className='mt-16 px-6'>
            {/* {searchCategory && (
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-black rounded-full'></div>
            </div>
        )} */}
            {searchCategory?.name && (
                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium'>{searchCategory.name.toUpperCase()}</p>
                    <div className='w-16 h-0.5 bg-black rounded-full'></div>
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className='text-2xl font-medium'>No Products Found for this category.</p>
                </div>
            )}
        </div>
    )
}

export default ProductCategory