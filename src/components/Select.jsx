import React, { useEffect, useRef, useState } from 'react'

const Select = ({ options, selected, placeholder }) => {
    const [show, setShow] = useState(false)
    const selectRef = useRef(null)
    const showOptions = () => {
        if (options && options.length > 0) setShow(!show)
    }
    useEffect(() => {
        const toggle = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", toggle)
        return () => {
            document.removeEventListener("mousedown", toggle)
        }
    }, [selectRef])

    return (
        <div className='relative' ref={selectRef}>
            <div className='border rounded relative cursor-pointer' onClick={showOptions}>
                <div className='hover:bg-gray-50 p-2 cursor-pointer flex flex-row gap-2 justify-start items-center'>
                    {selected ? <>
                        {selected.icon && <img src={selected.icon} alt={selected.name} className='object-cover' />}
                        <span className='capitalize font-semibold'>{selected.name}</span>
                    </> : <span className='capitalize font-medium whitespace-nowrap'>{placeholder}</span>}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            {show && <ul className='bg-white z-10 absolute top-100 left-0 w-full border text-start mt-1 rounded'>
                {(options && options.length > 0) && options.map((option, idx) => <li key={idx} className='hover:bg-gray-50 p-2 cursor-pointer flex flex-row gap-2 justify-start items-center'>
                    {option.icon && <img src={option.icon} alt={option.name} className='w-6 h-6 object-cover' />}
                    <span>{option.name}</span>
                </li>)}
            </ul>}
        </div>
    )
}

export default Select