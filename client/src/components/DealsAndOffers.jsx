import React from 'react';
import { dealsAndOffers } from '../data';
import DealsAndOffersCard from './DealsAndOffersCard';

const DealsAndOffers = () => {
    return (
        <div className='my-[5rem] px-5 md:px-[130px]'>
            <h2 className='text-[24px] text-[#1c1c1c] font-[600] mb-[24px] bg-[#51b7d5] p-3 md:px-5 text-white header-clip-bg'>Check out our amazing deals and offer</h2>
            <div className='flex md:flex-row justify-center items-center flex-wrap gap-x-3 gap-y-2'>
                {dealsAndOffers && dealsAndOffers.map((deal) => (
                    <DealsAndOffersCard key={deal._id} img={deal.img} productName={deal.name} price={deal.price} discount={deal.discount} />
                ))}
            </div>
        </div>
    )
}

export default DealsAndOffers