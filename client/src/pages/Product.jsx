import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import ProductTemplate from '../components/ProductTemplate';

const Product = () => {
  const [products, setProducts] = useState()
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data)
    }

    getProducts()
  }, [])
  return (
    <div className='md:px-[130px] flex gap-[3rem] my-[2rem]'>
      <div className='w-[30%]'>
        <Categories />
      </div>
      <div className='w-[70%]'>
        {products && products.map((product, index) => (
          <ProductTemplate key={index} img={product.img} price={product.price} productName={product.productName} rating={product.rating} description={product.description} id={product._id} />
        ))}
      </div>
    </div>
  )
}

export default Product