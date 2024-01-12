import React from 'react'
import { recommendedItems } from '../data'
import RecommendedCard from './RecommendedCard'

const RecommendedItms = () => {
    return (
        <div className='p-5 md:px-[130px] mb-[3rem]'>
            <h3 className='text-[24px] text-[#1c1c1c] font-[600] mb-[24px] bg-[#51b7d5] p-3 md:px-5 text-white header-clip-bg'>Recommended Items</h3>
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-[20px]">
                {recommendedItems && recommendedItems.map((item, index) => (
                    <div key={item._id} className='md:h-[310px] md:w-[220px] w-full md:mb-[20px] border-1 border-solid border-[#51b7d5]'>
                        <RecommendedCard img={item.img} price={item.price} description={item.description} name={item.name} link={index} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default RecommendedItms