import React from 'react'
import { Link } from 'react-router-dom'

const RecommendedCard = ({ img, price, name, description, link }) => {
    return (
        <>
            <div className='w-1/2 md:h-[200px] md:w-[200px] mx-auto my-auto mb-[10px] p-[10px]'>
                <img className='w-full h-full' src={img} alt='' />
            </div>
            <div className='flex flex-col justify-center p-[16px]'>
                {/* <span className='text-[#1c1c1c] text-[16px] font-[500]'>₦{price}</span> */}
                <span className='text-[8b9685] text-[1rem] text-center font-[500]'>{name}</span>
                <Link to={`/products/${link}`} className="no-underline text-[#8B96A5] text-center font-[400]">View Details</Link>
            </div>
        </>
    )
}

export default RecommendedCard