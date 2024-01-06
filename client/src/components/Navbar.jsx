import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/YupiGlobal_2.png';
import { FaAngleDown, FaAngleUp, FaSearch, FaUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { MdFavoriteBorder, MdArrowDropDown } from "react-icons/md";
import { CiShuffle, CiMenuBurger } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import Categories from './Categories';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/authSlice';


const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    const [showCategories, setShowCategories] = useState(false)
    const [mobileCat, setMobileCat] = useState(false)
    const [openCategories, setOpenCategories] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [logoutApiCall] = useLogoutMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const homeLocation = location.pathname === '/'

    const handlePinCategories = () => {
        setOpenCategories(true)
    }

    const handleUnpinCategories = () => {
        setOpenCategories(!openCategories)
        setShowCategories(false)
    }

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className='bg-[#161b6d]'>
            <div>
                <div className='flex justify-between items-center px-2 md:px-[3rem] py-5'>
                    <div className='flex items-center'>
                        <button className='bg-transparent border-none md:hidden'>
                            <span onClick={() => { setShowDropdown(true) }} className={showDropdown ? 'hidden' : 'flex'}><CiMenuBurger color='#ffffff' size={30} /></span>
                        </button>
                        <img className='w-[60px] md:w-[90px]' src={logo} alt='' />
                    </div>
                    <div className='md:w-[400px] hidden md:flex'>
                        <input className='w-[85%] p-3 rounded-tl-lg rounded-bl-lg border-none' type='search' placeholder='Search product...' />
                        <button className='border-none rounded-tr-lg rounded-br-lg w-[15%] bg-[#9d5bc5] flex justify-center items-center'><FaSearch color='#ffffff' /></button>
                    </div>
                    <div className='flex items-center gap-5'>
                        <span className='hidden md:flex'><CiShuffle color='#ffffff' size={25} /></span>
                        <span className='flex gap-1'>
                            <span><MdFavoriteBorder color='#ffffff' size={25} /></span>
                            <span className='bg-[#9d5bc5] rounded-full w-5 h-5 flex items-center justify-center p-1 text-white'>2</span>
                        </span>
                        <Link to='/cart' className='flex gap-1'>
                            <span><BsCart2 color='#ffffff' size={25} /></span>
                            {cartItems.length > 0 && (
                                <span className='bg-[#9d5bc5] rounded-full w-5 h-5 flex items-center justify-center p-1 text-white'>
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
                <hr />
                <div className={`px-[3.5rem] md:flex flex-col md:flex-row md:gap-[18rem] md:items-center ${showDropdown ? 'top-[0] left-[0] md:flex' : 'left-[-300px] md:flex'}`}>
                    <div className='hidden md:flex'>
                        {
                            openCategories ? (<button
                                className='bg-transparent border-none text-white text-[19px] flex items-center gap-4'
                                onClick={handleUnpinCategories}
                                onMouseEnter={() => { setShowCategories(true) }}
                                onMouseLeave={() => { openCategories ? setShowCategories(true) : setShowCategories(false) }}>

                                <span><GrClose color='#ffffff' size={22} /></span>

                                <span>Browse categories</span>
                            </button>) : (<button
                                className='bg-transparent border-none text-white text-[19px] flex items-center gap-4'
                                onClick={handlePinCategories}
                                onMouseEnter={() => { setShowCategories(true) }}
                                onMouseLeave={() => { setShowCategories(false) }}>

                                <span><CiMenuBurger color='#ffffff' size={22} /></span>

                                <span>Browse categories</span>
                            </button>)
                        }

                    </div>

                    <div
                        className={`md:text-white bg-[#ffffff] md:bg-transparent w-[90%] md:w-auto h-[5000px] md:h-auto absolute md:relative flex flex-col md:flex-row md:items-center md:gap-[20rem] ${showDropdown ? 'top-[0] left-[0] transition-all duration-[1s] ease-out z-20' : 'left-[-400px] md:left-[0] top-[0] transition-all duration-[1s] ease-out'}`}>
                        <section>
                            <span onClick={() => { setShowDropdown(false) }} className={`${showDropdown ? 'flex absolute top-[10px] right-[10px] md:hidden' : 'hidden'}`}><GrClose size={30} /></span>
                            <ul className='flex flex-col md:flex-row justify-between gap-8 list-none px-5 mt-[3rem] md:mt-[15px]'>
                                <li><Link className='no-underline text-black md:text-white' to='/'>Home</Link></li>
                                <li>Shop</li>
                                <li><Link className='no-underline text-black md:text-white' to='/products'>Product</Link></li>

                                <li className='md:hidden'>
                                    <div className='flex gap-3' onClick={() => { setMobileCat(!mobileCat) }}>
                                        <span>All Categories</span>
                                        <span>{mobileCat ? <FaAngleUp /> : <FaAngleDown />}</span>
                                    </div>
                                    {mobileCat && <Categories />}
                                </li>
                            </ul>
                        </section>
                        {userInfo ? (
                            <div className='relative cursor-pointer ml-[18px] md:ml-[3rem]'
                                onMouseLeave={() => { setShowProfileDropdown(false) }}
                                onMouseEnter={() => { setShowProfileDropdown(true) }}>
                                <div className='flex gap-3' >
                                    <span><FaUser /></span>
                                    <span className='flex items-center'>
                                        <span>{userInfo?.name}</span>
                                        <span className=''><MdArrowDropDown /></span>
                                    </span>
                                </div>
                                <div className={showProfileDropdown ? "grid ml-6 gap-4 absolute md:text-white md:bg-[#161b6d] p-2" : "hidden"}>
                                    <Link className='no-underline text-black md:text-white' to='/'>Profile</Link>
                                    <span onClick={handleLogout}>Logout</span>
                                </div>
                            </div>
                        ) : (
                            <div className='px-5'>
                                <Link to='/login' className='text-black md:text-white no-underline'>
                                    Login
                                </Link>/<Link to='/signup' className='text-black md:text-white no-underline'>
                                    register
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {showCategories && homeLocation && <Categories mdPosition='absolute' display='hidden' mdDisplay='flex' layout='flex-col' />}
        </nav>
    )
}

export default Navbar