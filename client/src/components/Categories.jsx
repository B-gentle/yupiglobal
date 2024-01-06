import React, { useState } from 'react'
import { categories } from '../data';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Categories = ({ mdPosition, display, mdDisplay, layout }) => {
    const [showChildren, setShowChildren] = useState(Array(categories.length).fill(false))
    const showSubCat = (index) => {
        const newShowChildren = showChildren.map((value, i) => (i === index ? !value : false));
        setShowChildren(newShowChildren);
    }
    return (
        <div className={`bg-[#ffffff] ${mdPosition} ${display} md:${mdDisplay} md:top-[10.7rem] md:left-[32px] ${layout} py-[1rem] md:border-full z-20`}>
                {
                    categories && categories.map((item, index) => (
                        <div key={index}>
                            <div className='flex flex-col gap-[1rem] md:border-right'>
                                <div className='mb-3 p-[1rem] flex justify-between items-center gap-8 border-bottom'>
                                    <span>
                                        <span className='mr-3'>{<item.icon />}</span>
                                        <span
                                            onClick={() => { showSubCat(index) }}
                                        className="cursor-pointer">{item.name}</span>
                                    </span>
                                    <span>{showChildren[index] ? (item.children && <FaAngleUp />) : (item.children && <FaAngleDown />)}</span>
                                </div>
                            </div>
                            <section className={showChildren[index] ? 'flex flex-col ml-[3rem] md:gap-[2rem]' : 'hidden'}>{item.children?.map((child, index) => (
                                <div key={index} className='md:col-span-2'>
                                    <h5>{child.subCat}</h5>
                                    {child.items && child.items.map((item, key) => (
                                        <ul key={key} className='list-none m-0 p-0'>
                                            <li>{item}</li>
                                        </ul>
                                    ))}
                                </div>
                            ))}</section>
                        </div>
                    ))
                }
        </div>
    )
}

export default Categories