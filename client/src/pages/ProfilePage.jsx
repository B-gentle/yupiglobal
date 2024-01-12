import React, { useEffect, useState } from 'react';
import { FaEye, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../redux/slices/authSlice';
import { useGetMyOrdesQuery } from '../redux/slices/ordersApiSlice';
import { useProfileMutation } from '../redux/slices/usersApiSlice';

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [upateProfile, { isLoading: updateProfileLoading }] = useProfileMutation()
    const { data: orders, isLoading, error } = useGetMyOrdesQuery()

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo.name, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords don't match")
        } else {
            try {
                const res = await upateProfile({ _id: userInfo._id, name, email, password }).unwrap()
                dispatch(setCredentials(res));
                toast.success("Profile updated successfully")
            } catch (error) {
                toast.error(error?.data?.message || error?.error)
            }
        }
    }
    return (
        <div className='flex flex-col md:flex-row px-3 md:px-[3rem] gap-x-[5rem] my-6'>
            <div className='md:w-3/12'>
                <h2>User Profile</h2>
                <form onSubmit={submitHandler}>
                    <div className='my-2 flex flex-col gap-2'>
                        <label htmlFor='name'>Name</label>
                        <input
                            className='p-2'
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            id="name"
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className='my-2 flex flex-col gap-2'>
                        <label htmlFor='email'>E-Mail</label>
                        <input
                            className='p-2'
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            id="email"
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className='my-2 flex flex-col gap-2'>
                        <label htmlFor='password'>Password</label>
                        <input
                            className='p-2'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            id="password"
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <div className='my-2 flex flex-col gap-2'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            className='p-2'
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            id="confirmPassword"
                            onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </div>

                    <div className='my-2 flex flex-col gap-2'>
                        <input
                            className='bg-[#9d5bc5] text-white w-full rounded-[4px] border-none p-2 mt-3'
                            type='submit'
                            value="Update"
                        />
                    </div>
                </form>
            </div>
            <div className='md:w-9/12'>
                <h2>My Orders</h2>
                {isLoading ? (<Loader />) : error ? (<div className='p-3 bg-[#FFEBEE] text-[#ED4337]'>{error?.data?.message || error?.error}</div>) : (
                    <div className='block w-full overflow-x-auto'>
                        <table className='w-full text-sm text-left'>
                            <thead>
                                <tr className='bg-white border-b'>
                                    <th className='px-6 py-3'>ID</th>
                                    <th className='px-6 py-3'>Date</th>
                                    <th className='px-6 py-3'>Total</th>
                                    <th className='px-6 py-3'>Paid</th>
                                    <th className='px-6 py-3'>Delivered</th>
                                    <th className='px-6 py-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order) => (
                                    <tr key={order._id} className="bg-white border-b">
                                        <td className='px-6 py-3'>{order._id}</td>
                                        <td className='px-6 py-3'>{order.createdAt?.substring(0, 10)}</td>
                                        <td className='px-6 py-3'>${order.totalPrice}</td>
                                        <td className='px-6 py-3'>{order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes color='red' />)}</td>
                                        <td className='px-6 py-3'>{order.isDelivered ? (order.DeliveredAt.substring(0, 10)) : (<FaTimes color='red' />)}</td>
                                        <td className='px-6 py-3'>
                                            <Link to={`/order/${order._id}`}>
                                                <FaEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage