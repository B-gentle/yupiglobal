import React from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/slices/usersApiSlice';
import { FaTrash, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UsersListPage = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')){
            try {
                await deleteUser(id);
                toast.success("User Deleted")
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    return (
        <div className='p-2 md:px-[130px]'>
            <h1>Users</h1>
            { deleteUserLoading && <Loader /> }
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
                                    <td className='px-4 py-4'>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td className='px-4 py-4'>
                                        {user.isAdmin ? <FaCheck color='green' /> : <FaTimes color='red' />}
                                    </td>
                                    <td className='px-4 py-4 flex'>
                                        <Link to={`/admin/user/${user._id}/edit`}>
                                            <button className='bg-[#161b6d] text-white border-none p-2 rounded mx-2'>
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        <button className='bg-red-500 text-white border-none p-2 rounded'
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