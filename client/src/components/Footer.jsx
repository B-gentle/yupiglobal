import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/YupiGlobal_2.png';

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className='bg-[#202026] p-4 pt-7 md:px-[130px] md:py-[1rem]'>
      <div className='grid md:grid-cols-4 mb-5 md:grid-flow-row-dense'>
        <section>
          <img className='w-[100px]' src={logo} alt='' />
          <p className='text-[#f3f3f3]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio molestias voluptas earum, quas repellat libero iusto odit, blanditiis reiciendis perspiciatis labore nulla facilis ullam alias, accusantium repudiandae ex eius aut?</p>
          <p>
            social links
          </p>
        </section>
        <section className='flex flex-col gap-3 md:ml-[4rem]'>
          <h2 className='text-white text-[18px]'>USEFUL LINKS</h2>
          <Link className='text-[#c3f3f3] no-underline'>About Yupi Global</Link>
          <Link className='text-[#c3f3f3] no-underline'>How to shop on yupi global</Link>
          <Link className='text-[#c3f3f3] no-underline'>FAQ</Link>
          <Link className='text-[#c3f3f3] no-underline'>Contact Us</Link>
          <a href='#' className='text-[#f3f3f3] no-underline'>Login</a>
        </section>
        <section className='flex flex-col gap-3'>
          <h2 className='text-white text-[18px]'>Customer Service</h2>
          <span className='text-[#c3f3f3] no-underline'>Payment Methods</span>
          <span className='text-[#c3f3f3] no-underline'>Money-back guarantee</span>
          <span className='text-[#c3f3f3] no-underline'>Returns</span>
          <span className='text-[#c3f3f3] no-underline'>Shipping</span>
          <span className='text-[#c3f3f3] no-underline'>Terms and conditions</span>
          <span className='text-[#c3f3f3] no-underline'>Privacy Policy</span>
        </section>
        <section className='flex flex-col gap-3'>
          <h2 className='text-white text-[18px]'>My Account</h2>
          <span className='text-[#c3f3f3] no-underline'>Sign In</span>
          <span className='text-[#c3f3f3] no-underline'>View Cart</span>
          <span className='text-[#c3f3f3] no-underline'>My Wishlist</span>
          <span className='text-[#c3f3f3] no-underline'>Track my order</span>
          <span className='text-[#c3f3f3] no-underline'>Help</span>
        </section>
      </div>
      <hr />
      <div className='flex flex-col md:flex-row justify-between text-white mt-5'>
        <p className='text-[14px] md:text-[17px]'>Copyright © {date} Yupi Global. All Rights Reserved.</p>
        <span className='text-center'>payment cards</span>
      </div>
    </footer>
  )
}

export default Footer