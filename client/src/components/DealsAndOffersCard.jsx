import React from 'react'

const DealsAndOffersCard = ( {img, productName, price, discount} ) => {
  return (
    <div className='md:w-[138px] md:h-[210px] border border-solid border-[#51b7d5]'>
        <div className='md:w-[100px] md:h-[100px] px-[19.3px] py-[9.3px] mb-[11px]'>
        <img className='w-full' src={img} alt='' />
        </div>
        <div className='flex flex-col items-center'>
        <span className='font-[400]'>{productName}</span>
        {/* <span>₦{price}</span> */}
        <span className='bg-[#FFE3E3] text-[#EB001B] px-[13px] py-[3px] rounded-[29px] mt-2'>-{discount}%</span>
        </div>
    </div>
  )
}

export default DealsAndOffersCard