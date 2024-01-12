import React from 'react';
import { FaEye, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';

const ViewOrders = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery()
  return (
    <>
    <h1 className='text-center'>Orders</h1>
    {isLoading ? <Loader /> : error ? <Message type="error" message={error} /> : (
    <div className='overflow-x-auto md:px-[150px] px-3 my-5'>
      <table>
        <thead className='bg-gray-200 border-b'>
        <th scope='col' className='px-6 py-4'>ID</th>
          <th scope='col' className='px-6 py-4'>User</th>
          <th scope='col' className='px-6 py-4'>Date</th>
          <th scope='col' className='px-6 py-4'>Total</th>
          <th scope='col' className='px-6 py-4'>Paid</th>
          <th scope='col' className='px-6 py-4'>Delivered</th>
          <th scope='col' className='px-6 py-4'></th>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <tr key={order._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className='px-6 py-4'>{order._id}</td>
              <td className='px-6 py-4'>{order.user && order.user.name}</td>
              <td className='px-6 py-4'>{order.createdAt?.substring(0, 10)}</td>
              <td className='px-6 py-4'>{order.totalPrice}</td>
              <td className='px-6 py-4'>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (<FaTimes color='red' />)}
              </td>
              <td className='px-6 py-4'>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes color='red' />
                )}
              </td>
              <td className='px-6 py-4'>
              <Link to={`/order/${order._id}`}><FaEye /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
      
    </>
  )
}

export default ViewOrders