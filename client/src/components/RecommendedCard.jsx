import React from 'react'

const RecommendedCard = ({ img, price, description }) => {
    return (
        <>
            <div className='h-[200px] w-[200px] mb-[10px] p-[10px]'>
                <img className='w-full h-full' src={img} alt='' />
            </div>
            <div className='flex flex-col p-[16px]'>
                {/* <span className='text-[#1c1c1c] text-[16px] font-[500]'>₦{price}</span> */}
                <span className='text-[8b9685] text-[1rem] font-[400]'>{description}</span>
            </div>
        </>
    )
}

export default RecommendedCard