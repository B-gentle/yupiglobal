import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetOrderDetailsQuery } from '../redux/slices/ordersApiSlice';

const OrdersPage = () => {
    const {id: orderId} = useParams();
    const { data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)
    console.log(order)
  return (
    <div>

    </div>
  )
}

export default OrdersPage