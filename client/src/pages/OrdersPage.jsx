import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetOrderDetailsQuery, usePayOrderMutation, useUpdateDeliverOrderMutation } from '../redux/slices/ordersApiSlice';

const OrdersPage = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: payOrderLoader }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: deliverLoading }] = useUpdateDeliverOrderMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const approvePayment = async () => {
    await payOrder({
      orderId, details: {
        payer: {}
      }
    }).unwrap();
    refetch();
    toast.success('Payment Successful')
  }

  const deliverOrderHandler = async() => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("order delivered")
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error?.error)
    }
  }

  return isLoading ? <Loader /> : error ? <Message type='error' message={error?.data?.message} /> :
    <div className='px-2 md:px-[3.5rem] py-5'>
      <h1 className='text-[16px] md:text-[18px]'> Order {order._id} </h1>
      <div className="flex flex-col md:flex-row md:gap-[4rem] box-border">
        <div className="md:w-8/12">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong> {order?.user?.name}
            </p>
            <p>
              <strong>email: </strong> {order?.user?.email}
            </p>
            <p>
              <strong>Address: </strong> {order?.shippingAddress?.address}, {order?.shippingAddress?.city} {' '} {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
            </p>
            <>
              {order.isDelivered ? (
                <p className='bg-[#99EDC3] text-[#234F1E] rounded p-3'>
                  Delivered on {order.deliveredAt}
                </p>
              ) : (
                <p className='bg-[#FBCEB1] text-red-500 rounded p-3'>Not delivered</p>
              )}
            </>
          </div>
          <div>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <p className='bg-[#99EDC3] text-[#234F1E] rounded p-3'>
                Paid on {order.paidAt}
              </p>
            ) : (
              <p className='bg-[#FBCEB1] text-red-500 rounded p-3'>Not Paid</p>
            )}
          </div>
          <div>
            <h2>Order Items</h2>
            {order && order.orderItems.map((item, index) => (
              <div key={index} className='flex flex-col md:flex-row items-center'>
                <div className="md:w-1/12 md:mr-3 w-1/2">
                  <img src={item.image} alt={item.name} className="w-full rounded" />
                </div>
                <div className="md:w-4/12">
                  <Link to={`/product/${item.product}`} className="no-underline text-black">{item.name}</Link>
                </div>
                <div className='md:w-4/12'>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-4/12">
          <div className="shadow p-3">
            <h2>Order Summary</h2>
            <div className='mb-2 flex justify-between'>
              <strong>Items:</strong>
              <span>${order.itemsPrice}</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <strong>Shipping: </strong>
              <span>${order.shippingPrice}</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <strong>Tax: </strong>
              <span>${order.taxPrice}</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <strong>Total: </strong>
              <span>${order.totalPrice}</span>
            </div>
            <div>
              {!order.isPaid && (
                <div>
                  {payOrderLoader && <Loader />}
                  {userInfo && userInfo.isAdmin && !order.isPaid && (
                    <button className='bg-[#9d5bc5] text-white w-full rounded-[4px] border-none p-2 mt-3'
                    onClick={approvePayment}>Pay</button>
                  )}  
                </div>
              )}
              {deliverLoading && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button type='button'
                  onClick={deliverOrderHandler}
                  className='bg-[#9d5bc5] text-white w-full rounded-[4px] border-none p-2 mt-3'
                >Mark as delivered</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
}

export default OrdersPage