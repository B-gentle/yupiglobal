import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const searchParameter = new URLSearchParams(search);
  const redirect = searchParameter.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {email, password } = form
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      setForm({
        email: '',
        password: ''
      })
      navigate(redirect)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error?.error || error)
    }
  }

  return (
    <div className='grid md:grid-cols-12 py-5 p-2 px-5 md:px-2 md:mb-[6rem]'>
      <h2 className='md:col-start-6 text-center'>Login</h2>
      <form onSubmit={submitHandler} className='flex flex-col gap-6 w-full md:w-[300px] md:col-start-6 mb-6'>
        <div className='flex'>
          <input className='p-2 rounded border w-full' type="email" name="email" onChange={handleInputChange} value={form.email} placeholder="email" required />
        </div>
        <div className='flex'>
          <input className='p-2 rounded border w-full' type="password" name="password" onChange={handleInputChange} value={form.password} placeholder="password" required />
        </div>
        <small className='text-center'>forgot password?</small>
        <button className='bg-[#9d5bc5] text-white p-2 rounded-[4px] border-none block' type="submit" disabled={isLoading}>Login</button>
        {isLoading && <Loader />}
        <small className='flex justify-between'><span>Not yet a member</span> <Link to={ redirect ? `/signup?redirect=${redirect}` : '/signup'} className='text-black no-underline'>Register</Link></small>
      </form>
    </div>
  )
}

export default Login