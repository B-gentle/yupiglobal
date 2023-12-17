import React from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductTemplate from '../components/ProductTemplate';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';

const Product = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <div className='md:px-[130px] flex gap-[3rem] my-[2rem]'>
      <div className='w-[30%]'>
        <Categories />
      </div>
      <div className='w-[70%]'>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="error" message={error?.data?.message || error.error} />
        ) : (
          <>
          {products && products.map((product, index) => (
          <ProductTemplate key={index} img={product.image} price={product.price} productName={product.name} rating={product.rating} description={product.description} id={product._id} />
        ))}</>
        )} 
      </div>
    </div>
  )
}

export default Product