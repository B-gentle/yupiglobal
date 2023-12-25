import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { saveShippingAddress } from '../redux/slices/cartSlice';

const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart


    const [location, setLocation] = useState({
        address: shippingAddress?.location?.address || '',
        city: shippingAddress?.location?.city || '',
        postalCode: shippingAddress?.location?.postalCode || '',
        country: shippingAddress?.location?.country || '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setLocation({ ...location, [id]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(saveShippingAddress({location}));
       navigate('/payment');
    }
    return (
        <div className='grid md:grid-cols-12 px-2'>
            <div className='md:col-start-6 md:col-span-3'>
            <CheckOutSteps step1 step2 />
            </div>
           
            <h1 className='md:col-start-6 md:col-span-3'>Shipping Details</h1>
            <form onSubmit={handleSubmit} className='md:col-start-5 md:col-span-4'>
                <div className='grid gap-2 my-2'>
                    <label htmlFor='address'>Enter Address</label>
                    <input className='p-2' type="text" id="address" onChange={handleInputChange} placeholder='Address' value={location.address} />
                </div>
                <div className='grid gap-2 my-2'>
                    <label htmlFor='city'>Enter City</label>
                    <input className='p-2' type="text" id="city" onChange={handleInputChange} placeholder='City' value={location.city} />
                </div>
                <div className='grid gap-2 my-2'>
                    <label htmlFor='postalCode'>Enter Postal Code</label>
                    <input className='p-2' type="text" id="postalCode" onChange={handleInputChange} placeholder='Postal Code' value={location.postalCode} />
                </div>
                <div className='grid gap-2 my-2'>
                    <label htmlFor='country'>Enter Country</label>
                    <input className='p-2' type="text" id="country" onChange={handleInputChange} placeholder='Country' value={location.country} />
                </div>
                <div className='my-5'>
                    <input className='bg-[#9d5bc5] text-white w-full rounded-[4px] border-none p-2' type="submit" value="Continue" />
                </div>
            </form>
        </div>
    )
}

export default ShippingScreen