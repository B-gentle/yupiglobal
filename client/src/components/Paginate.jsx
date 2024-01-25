import React from 'react';
import { NavLink } from 'react-router-dom';

const Paginate = ({ page, pages, isAdmin = false, keyword = '', userRoute, adminRoute }) => {
    return (
        pages > 1 && (
            <div className='flex gap-x-3 justify-center items-center my-[6rem]'>
                {[...Array(pages).keys()].map((x) => (
                    <NavLink key={x + 1} 
                    to={!isAdmin ? keyword ? `products/search/${keyword}/page/${x + 1}` : `${userRoute}/${x + 1}` : `${adminRoute}/${x + 1}`}
                    active={x + 1 === page}
                    className={'no-underline text-black'}>
                        { x + 1}
                    </NavLink>
                ))}
            </div>
        )

    )
}

export default Paginate