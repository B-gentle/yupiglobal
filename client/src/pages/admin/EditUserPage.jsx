import React, { useState, useEffect } from 'react';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/slices/usersApiSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditUserPage = () => {

    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: updatingUser }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await updateUser({ userId, name, email, isAdmin });
            if (res.error) {
                throw new Error()
            } else {
                toast.success("User Details Updated Successfully");
                refetch();
                navigate('/admin/userslist')
            }

        } catch (error) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <div className='p-3 md:px-[130px]'>
            <Link to='/admin/usersList' className='no-underline text-black bg-grey-500 p-3 rounded shadow mt-4'>Go back</Link>
            <h1>Edit User</h1>
            {updatingUser && <Loader />}
            {isLoading ? <Loader /> : error ? <Message type="error" message={error?.data?.message || error?.message || error?.error} /> : (
                <form onSubmit={submitHandler} className="md:w-2/6 flex flex-col gap-4">
                    <div className='flex flex-col my-2'>
                        <label className='font-[500] text-[18px]'>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className='p-3'
                        />
                    </div>
                    <div className='flex flex-col my-2'>
                        <label className='font-[500] text-[18px]'>email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className='p-3'
                        />
                    </div>
                    <div>
                        <label>Make Admin</label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => { setIsAdmin(e.target.checked) }}
                        />
                    </div>

                    <input
                        type="submit"
                        className='bg-[#161b6d] text-white border-none p-2 rounded'
                        value="Update User"
                    />
                </form>
            )}
        </div>
    )
}

export default EditUserPage