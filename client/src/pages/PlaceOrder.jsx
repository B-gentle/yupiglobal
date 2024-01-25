import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckOutSteps from '../components/CheckOutSteps';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearCartItems } from '../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    const PlaceOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <>
            <div className='flex flex-col px-3 md:px-[100px]'>
                <div className='flex justify-center items-center'>
                    <CheckOutSteps step1 step2 step3 step4 />
                </div>

                <div className='flex flex-col md:flex-row md:gap-[10rem] p-1 md:p-5'>
                    <div className='md:w-8/12'>
                        <div className='border-bottom'>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {' '} {cart.shippingAddress.postalCode}, {' '} {cart.shippingAddress.country}
                            </p>
                        </div>

                        <div className='border-bottom'>
                            <h2>Payment Method</h2>
                            <p><strong>Method:</strong> {cart.paymentMethod}</p>
                        </div>

                        <div className='border-bottom'>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <div>
                                    {cart.cartItems.map((item, index) => (
                                        <div className='flex flex-col md:flex-row items-center border-bottom my-4' key={index}>
                                            <div className="md:w-1/12 mr-2">
                                                <img src={item.image} alt={item.name} className='w-full rounded-[4px]' />
                                            </div>
                                            <div className='md:w-4/12'>
                                                <Link to={`/products/${item._id}`} className='text-black no-underline'>{item.name}</Link>
                                            </div>

                                            <div className='md:w-4/12'>
                                                {item.qty} x {item.price} = {item.qty * item.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='md:w-4/12'>
                        <div className='shadow p-3'>
                            <h2>Order Summary</h2>
                            <hr />
                            <p className="flex justify-between">
                                <strong>Items</strong>
                                <span>${cart.itemsPrice}</span>
                            </p>
                            <hr />

                            <p className="flex justify-between">
                                <strong>Shipping</strong>
                                <span>${cart.shippingPrice}</span>
                            </p>
                            <hr />

                            <p className="flex justify-between">
                                <strong>Tax</strong>
                                <span>${cart.taxPrice}</span>
                            </p>
                            <hr />

                            <p className="flex justify-between">
                                <strong>Total</strong>
                                <span>${cart.totalPrice}</span>
                            </p>
                            <hr />
                            {error && <Message type="error" message={error.data.message} />}
                            <div>
                                <button
                                type='button'
                                className='bg-[#9d5bc5] text-white w-full rounded-[4px] border-none p-2'
                                disabled={cart.cartItems.length === 0}
                                onClick={PlaceOrderHandler}>Place Order</button>
                            </div>
                            {isLoading && <Loader />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrder