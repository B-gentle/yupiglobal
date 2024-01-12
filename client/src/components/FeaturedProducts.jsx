import React, { useState } from 'react'
import { products } from '../data'
import RecommendedCard from './RecommendedCard'
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';

const FeaturedProducts = () => {
    const [category, setCategory] = useState('featured-products')
    const list = products.filter((prd) => prd.category === category);
    const last = list.length - 1
    const { data: productItems, isLoading, error } = useGetProductsQuery()

    return (
        <div className='p-5 md:px-[130px]'>
            <h2 className='text-[24px] text-[#1c1c1c] font-[600] mb-[24px] bg-[#51b7d5] py-3 px-5 md:px-6 text-white header-clip-bg flex items-center gap-6 overflow-x-scroll md:overflow-x-auto'>
                <span
                    className={category === 'featured-products' ? 'text-[20px] p-2 rounded cursor-pointer bg-[#9d5bc5]' : 'text-[16px] cursor-pointer'}
                    onClick={() => { setCategory('featured-products') }}>Featured Products</span>
                <span
                    className={category === 'new-products' ? 'text-[20px] p-2 rounded cursor-pointer bg-[#9d5bc5]' : 'text-[16px] cursor-pointer'}
                    onClick={() => { setCategory('new-products') }}>New Arrivals</span>
                <span
                    className={category === 'popular-products' ? 'text-[20px] p-2 rounded cursor-pointer bg-[#9d5bc5]' : 'text-[16px] cursor-pointer'}
                    onClick={() => { setCategory('popular-products') }}>Popular Products</span>
            </h2>
            <div className="grid md:grid-cols-12 border border-solid border-[#51b7d5]">
                <div className='md:col-span-3 w-full flex justify-center items-center border-right-product'>
                    <img className='w-full mb-[20%]' src={list[last].img} alt='' />
                    {/* <span>{list[last].price}</span> */}
                </div>
                <div className='grid lg:grid-cols-3 items-center md:col-span-9 w-full box-border'>
                    {productItems && productItems.map((product) => (
                        <div key={product._id} className="lg:grid-col-span-3 w-full border-right-product border-bottom-product">
                            <RecommendedCard img={product.image} description={product.description} link={product._id} name={product.name} />
                        </div>
                    ))}
                    {products && products.filter((product) => product.category === category).map((product) => (
                        <div key={product._id} className='border-right-product border-bottom-product lg:grid-col-span-3'>
                            <RecommendedCard img={product.img} price={product.price} name={product.productName} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedProducts