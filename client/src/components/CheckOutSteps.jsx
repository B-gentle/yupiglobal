import React from 'react'
import { Link } from 'react-router-dom'

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-content-center gap-4 my-4">
            <div>
                {step1 ? (
                    <Link className="no-underline text-black" to='/login'>Login</Link>
                ) : (
                    <Link to='/login' className='pointer-events-none text-[#686868] no-underline'>Login</Link>
                )
                }
            </div>
            <div>
            {step2 ? (
                    <Link className="no-underline text-black" to='/shipping'>Shipping</Link>
                ) : (
                    <Link to='/shipping' className='pointer-events-none text-[#686868] no-underline'>shipping</Link>
                )
                }
            </div>
            <div>
            {step3 ? (
                    <Link className="no-underline text-black" to='/payment'>Payments</Link>
                ) : (
                    <Link to='/payment' className='pointer-events-none text-[#686868] no-underline'>Payments</Link>
                )
                }
            </div>
            <div>
            {step4 ? (
                    <Link className="no-underline text-black" to='/placeorder'>Place Order</Link>
                ) : (
                    <Link to='/placeorder' className='pointer-events-none text-[#686868] no-underline'>Place Order</Link>
                )
                }
            </div>
        </nav>
    )
}

export default CheckOutSteps