import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { paymentIcons } from '../data';
import { savePaymentMethod } from '../redux/slices/cartSlice';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
    const handleInputChange = (e) => {
        const { value } = e.target
        setPaymentMethod(value)
        console.log(value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    return (
        <div className='grid md:grid-cols-12'>
            <div className='md:col-start-5 col-span-3'>
                <CheckOutSteps step1 step2 step3 />
            </div>

            <form onSubmit={submitHandler} className='md:col-start-5 col-span-3'>
                <div className='flex flex-col gap-4 items-center'>
                    {paymentIcons && paymentIcons.map((icon, id) => (
                        <div key={id} className=''>
                            <label htmlFor={icon.value}><img className='w-[50px]' src={icon.image} alt={icon.value} /></label>
                            <input type="radio" name="paymentOption" id={icon.value} value={icon.value} onChange={handleInputChange} />
                        </div>
                    ))}
                </div>
                <div className='my-5'>
                    <input className='bg-[#9d5bc5] text-white w-full rounded-[4px] border-none p-2' type="submit" value="Continue" />
                </div>
            </form>
        </div>
    )
}

export default PaymentScreen