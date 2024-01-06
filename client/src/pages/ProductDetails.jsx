import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../redux/slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  const productDescription = product?.description?.split(',');
  const filteredDescription = productDescription?.filter((item) => item.trim() !== '')

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message={error?.data?.message || error.error} />
      ) : (
        <div className='flex flex-col md:flex-row gap-[3rem] md:gap-[6rem] items-center md:justify-center my-[3rem] p-5'>
          <div className='w-[40%] md:w-[300px] md:h-[300px]'>
            <img className='w-full h-full' src={product?.image} alt='' />
          </div>
          <div className='flex flex-col'>
            <span className='text-[20px] text-[#1c1c1c] font-[600]'>{product?.name}</span>
            <ul>
              {
                filteredDescription.map((item, id) => <li key={id} className="capitalize mb-4">{item}</li>)
              }
              </ul>
          </div>
          <div className='flex flex-col gap-3'>
            {product.countInStock > 0 && (
              <div className='flex items-center gap-3'>
                <select
                  className='p-2 rounded-[4px]'
                  onChange={(e) => { setQty(Number(e.target.value)) }}
                  value={qty}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <span>{qty} item(s) Selected</span>
              </div>
            )}
            <button
              className='bg-[#9d5bc5] border-none rounded-[4px] p-3 text-white'
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}>Add to cart</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductDetails