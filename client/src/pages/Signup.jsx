import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  })

  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation()
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
      const {name, email, password, cpassword,  } = form
      if(password !== cpassword){
        return (
          toast.error("password does not match")
        )
      }
      if(password.length < 4){
        return (
          toast.error("password must be up to 4 characters")
        )
      }
      const res = await register({ name, email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error?.error || error)
    }
  }

  return (
    <div className='grid md:grid-cols-12 py-5 p-2 px-5 md:px-2 md:mb-[6rem]'>
      <h2 className='md:col-start-6 text-center'>Register</h2>
      <form onSubmit={submitHandler} 
      className='flex flex-col gap-6 w-full md:w-[300px] md:col-start-6 mb-6'>
        <div className='flex'>
          <input className='p-2 rounded border w-full' type="text" name="name" onChange={handleInputChange} value={form.name} placeholder="Name" required />
        </div>
        <div className='flex'>
          <input className='p-2 rounded border w-full' type="email" name="email"  onChange={handleInputChange} value={form.email} placeholder="email" required />
        </div>
        <div className='flex'>
          <input className='p-2 rounded border w-full' type="password" name="password" onChange={handleInputChange} value={form.password} placeholder="Password" required />
        </div>
        <div className='flex'>
          <input className='p-2 rounded border w-full' type="password" name="cpassword" onChange={handleInputChange} value={form.cpassword} placeholder="Confirm password" required />
        </div>
        <button className='bg-[#9d5bc5] text-white p-2 rounded-[4px] border-none block' type="submit" disabled={isLoading}
        >Submit</button>
        {isLoading && <Loader />} 
         <small className='flex justify-between'><span>Already a member</span> <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'} className='text-black no-underline'>Login</Link></small>
      </form>
    </div>
  )
}

export default Signup