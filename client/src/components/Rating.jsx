import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({value, text}) => {
  return (
    <div className='space-x-2'>
        <span>
            {value >= 1 ? <FaStar color='#cc5500' /> : value >= 0.5 ? <FaStarHalfAlt color='#cc5500' /> : <FaRegStar color='#cc5500' />}
        </span>

        <span>
            {value >= 2 ? <FaStar color='#cc5500' /> : value >= 1.5 ? <FaStarHalfAlt color='#cc5500' /> : <FaRegStar color='#cc5500' />}
        </span>

        <span>
            {value >= 3 ? <FaStar color='#cc5500' /> : value >= 2.5 ? <FaStarHalfAlt color='#cc5500' /> : <FaRegStar color='#cc5500' />}
        </span>

        <span>
            {value >= 4 ? <FaStar color='#cc5500' /> : value >= 3.5 ? <FaStarHalfAlt color='#cc5500' /> : <FaRegStar color='#cc5500' />}
        </span>

        <span>
            {value >= 5 ? <FaStar color='#cc5500' /> : value >= 4.5 ? <FaStarHalfAlt color='#cc5500' /> : <FaRegStar color='#cc5500' />}
        </span>

        <span>{text && text}</span>
    </div>
  )
}

export default Rating