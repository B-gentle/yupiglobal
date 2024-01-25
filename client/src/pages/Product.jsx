import React, {useEffect} from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductTemplate from '../components/ProductTemplate';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import { useMediaQuery } from 'react-responsive';
import { useParams } from "react-router-dom";
import Paginate from '../components/Paginate';
import Meta from "../components/Meta"

const Product = () => {

  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });
  
  const isMobile = useMediaQuery({
    query: '(max-width: 780px)'
})

useEffect(() => {
window.scrollTo(0,0);
}, [])
  return (
    <>
    <Meta title="Products - Yupi Global" />
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
          <Message type="error" message={error?.data?.message || error?.message || error.error} />
        ) : (
          <>
          {data && data.products.map((product, index) => (
          <ProductTemplate key={index} img={product.image} price={product.price} productName={product.name} rating={product.rating} description={product.description.slice(0, 100)+'...'} id={product._id} />
        ))} 

          <Paginate pages={data.pages} page={data.page} userRoute='/products/page' keyword={keyword ? keyword : ''} />
        
        </>
        )} 
      </div>
    </div>
    </>
  )
}

export default Product