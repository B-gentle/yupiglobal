import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { brands } from '../data';

const BrandShopping = () => {
    return (
        <div className='mt-[3rem]'>
            <h2 className='text-center mb-[2rem]'>Shop By Brands</h2>
            <div className='p-2 md:px-[130px] mb-[3rem]'>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={2}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        }
                    }}
                    navigation={true} 
                    modules={[Navigation]}
                    className='flex justify-center items-center'
                >
                   {brands && brands.map((brand, id) => (
                       <SwiperSlide key={id}><img className='w-[50px] md:w-[100px]' src={brand} alt='' /></SwiperSlide>
                   ))}
                </Swiper>
            </div>
        </div>
    )
}

export default BrandShopping