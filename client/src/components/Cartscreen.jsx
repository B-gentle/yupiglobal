import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
// import Message from './Message';

const Cartscreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart);

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
navigate('/login?redirect=/shipping')
    }

    return (
        <div className='grid md:grid-cols-12 p-2 md:pl-[5rem]'>
            <div className='md:col-span-8'>
                <h1 className='mb-[20px]'>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <span>Your cart is empty <Link to='/products'>Go Back</Link></span>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div className='md:grid md:grid-cols-12 gap-3 mb-[5rem] border-bottom pb-6' key={item._id}>
                                <div className="md:col-span-2">
                                    <img className='w-full rounded' src={item.image} alt={item.name} />
                                </div>
                                <div className="md:col-span-3">
                                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                                </div>
                                <div className="md:col-span-2">
                                    ${item.price}
                                </div>
                                <div className="md:col-span-2">
                                    <select
                                        className='p-2 rounded-[4px]'
                                        value={item.qty}
                                        onChange={(e) => { addToCartHandler(item, Number(e.target.value)) }}>
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <button onClick={() => {removeFromCartHandler(item._id)}}><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='md:col-span-4'>
                <div className='border-full p-4'>
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </div>
                <button
                    disabled={cartItems.length === 0}
                    className='bg-[#9d5bc5] border-none text-white p-2 rounded'
                    onClick={checkoutHandler}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Cartscreen