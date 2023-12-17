import React from 'react';
import loader from '../assets/loader.gif';

const Loader = () => {
  return (
    <div className='w-[100px] h-[100px] block m-auto'>
        <img className='w-full' src={loader} alt='' />
    </div>
  )
}

export default Loader