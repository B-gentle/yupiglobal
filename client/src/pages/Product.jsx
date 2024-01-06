import React from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductTemplate from '../components/ProductTemplate';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import { useMediaQuery } from 'react-responsive';

const Product = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();
  const isMobile = useMediaQuery({
    query: '(max-width: 780px)'
})
  return (
    <>
      { isMobile && <div className='md:w-[25%]'>
        <Categories layout="flex flex-row overflow-x-scroll" />
      </div>
       }
    <div className='md:px-[50px] flex gap-[3rem] my-[2rem]'>
     { !isMobile &&
     <div className='md:w-[25%]'>
        <Categories layout="grid" />
      </div>
      }
      <div className='md:w-[70%]'>
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
    </>
  )
}

export default Product