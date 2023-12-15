import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'

const ProductTemplate = ({ img, price, rating, productName, description, discount, id }) => {
  return (
    <div className='flex md:items-center gap-[2rem] h-[230px] border-full mb-[3rem] ml-[1rem]'>
      <div className='w-[210px] px-[12px] py-[13px] flex justify-center items-center'>
        <img className='w-full' src={img} alt='' />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='font-[500] text-[#1c1c1c]'>{productName}</span>
        <span>
          {/* <span className='text-[20px] font-[600]'>{price}</span> */}
          <span>{discount}</span>
        </span>
        <Rating value={rating} />
        <span className='text-[#505050] font-[400]'>{description}</span>
        <Link to={`/products/${id}`} className='no-underline'>View Details</Link>
      </div>
    </div>
  )
}

export default ProductTemplate