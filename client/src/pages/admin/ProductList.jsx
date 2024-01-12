import React from 'react';
import { FaEye, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';

const ProductList = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();
    return (
        <>
            <div className='flex justify-between items-center p-3 md:px-[100px]'>
                <h1>Products</h1>
                <div>
                    <button className='bg-[#161b6d] text-white border-none p-2 rounded'>
                        <FaEdit /> Create Product
                    </button>
                </div>
            </div>

            {
                isLoading ? <Loader /> : error ? <Message type="error" message={error?.data?.message || error?.message || error?.error} /> : (
                    <div className='overflow-x-auto'>
                        <table className='min-w-full'>
                            <thead className='bg-gray-200 border-b'>
                                <th className='px-6 py-4'>ID</th>
                                <th className='px-6 py-4'>Name</th>
                                <th className='px-6 py-4'>Price</th>
                                <th className='px-6 py-4'>Category</th>
                                <th className='px-6 py-4'>Brand</th>
                                <th className='px-6 py-4'></th>
                                <th className='px-6 py-4'></th>
                            </thead>
                            <tbody>
                                {products && products.map((product) => (
                                    <tr key={product._id} className='border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                        <td className='px-6 py-4'>{product._id}</td>
                                        <td className='px-6 py-4'>{product.name}</td>
                                        <td className='px-6 py-4'>{product.price}</td>
                                        <td className='px-6 py-4'>{product.category}</td>
                                        <td className='px-6 py-4'>{product.brand}</td>
                                        <td className='px-6 py-4'></td>
                                        <td className='px-6 py-4'></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </>
    )
}

export default ProductList