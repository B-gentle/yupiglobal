import React from 'react'
import { Link } from 'react-router-dom'

const DealsAndOffersCard = ( {img, productName, price, discount, link} ) => {
  return (
    <div className='w-[138px] h-[210px] border border-solid border-[#51b7d5]'>
      <Link to={`/product/${link}`} className="no-underline text-black">
        <div className='w-[100px] h-[100px] px-[19.3px] py-[9.3px] mb-[11px]'>
        <img className='w-full h-full' src={img} alt='' />
        </div>
        <div className='flex flex-col items-center'>
        <span className='font-[400]'>{productName}</span>
        {/* <span>₦{price}</span> */}
        <span className='bg-[#FFE3E3] text-[#EB001B] px-[13px] py-[3px] rounded-[29px] my-[1.5rem] md:my-5'>-{discount}%</span>
        </div>
        </Link>
    </div>
  )
}

export default DealsAndOffersCard