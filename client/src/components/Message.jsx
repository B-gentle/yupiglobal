import React, { useState, useEffect } from 'react'

const Message = ({ type, message }) => {


  return (
    <>
      <div className='w-full'>
          <div className={type === 'error' ? 'bg-red-500 rounded' : type === 'info' ? 'bg-[#161b6d] rounded' : 'bg-green-600 rounded'}>
            <p className='text-white font-semibold px-[1rem] py-[1rem]'>{message}</p>
          </div>
      </div>

    </>
  )
}

export default Message