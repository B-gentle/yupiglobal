import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();

    const [keyword, setKeyword ] = useState(urlKeyword || '')

    const submitHandler = async(e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/search/${keyword}`)
            setKeyword('')
        }else{
            navigate('/products')
        }
    }
    return (
        <form onSubmit={submitHandler} className='flex md:w-[30rem]'>
            <input 
            className='w-[85%] p-3 rounded-tl-lg rounded-bl-lg border-none outline-none' 
            type='text' 
            placeholder='Search product...'
            value={keyword}
            onChange={(e) => {setKeyword(e.target.value)}} 
            name="search"
            />
            <button 
            type="submit"
            className='border-none rounded-tr-lg rounded-br-lg w-[15%] bg-[#9d5bc5] flex justify-center items-center'><FaSearch color='#ffffff' /></button>
        </form>
    )
}

export default SearchBox