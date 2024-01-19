import React from 'react';
import { useGetUsersQuery } from '../../redux/slices/usersApiSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';

const UsersListPage = () => {

    const { data: users, refetch, isLoading, error} = useGetUsersQuery()

    const deleteHandler = async () => {
        console.log('del')
    }
  return (
    <div className='p-2 md:px-[130px]'>
        <h1>Users</h1>
        {isLoading ? <Loader /> : error ? <Message type="error" message={error?.data?.message || error?.error} /> : (
        <div className='overflow-x-auto'>
       <table className='w-full'>
                            <thead className='bg-gray-200 border-b'>
                                <tr>
                                    <th className='px-4 py-4'>ID</th>
                                    <th className='px-4 py-4'>Name</th>
                                    <th className='px-4 py-4'>Email</th>
                                    <th className='px-4 py-4'>Admin</th>
                                    <th className='px-4 py-4'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => (
                                    <tr key={user._id} className='border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                        <td className='px-4 py-4'>{user._id}</td>
                                        <td className='px-4 py-4'>{user.name}</td>
                                        <td className='px-4 py-4'>{user.email}</td>
                                        <td className='px-4 py-4'>{user.isAdmin}</td>
                                        <td className='px-4 py-4'>
                                            <Link to={`/admin/product/${user._id}/edit`}>
                                                <button className='bg-[#161b6d] text-white border-none p-2 rounded mx-2'>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button className='bg-[#161b6d] text-white border-none p-2 rounded'
                                                onClick={() => { deleteHandler(user._id) }}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
        </div>
        )}
    </div>
  )
}

export default UsersListPage