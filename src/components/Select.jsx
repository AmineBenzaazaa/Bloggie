import React, { useEffect, useRef, useState } from 'react'

const Select = ({ options, placeholder, option }) => {
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState((options && options.length > 0) ? options[0] : {})
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

    const changeOption = (idx, items) => {
        setSelected(items[idx])
        option(items[idx]);
        setShow(false)
    }

    return (
        <div className='relative w-[100%]'  ref={selectRef}>
            <div className='border rounded relative cursor-pointer' onClick={showOptions}>
                <div className='hover:bg-gray-50 p-2 cursor-pointer flex flex-row gap-2 justify-start items-center h-10'>
                    {(selected && Object.keys(selected).length > 0) ? <>
                        <span className='capitalize font-semibold'>{selected.name}</span>
                    </> : <span className='capitalize font-medium whitespace-nowrap'>{placeholder}</span>}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            {show && <ul className='bg-white z-10 absolute top-100 left-0 w-full border text-start mt-1 rounded max-h-72 overflow-auto'>
                {(options && options.length > 0) && options.map((option, idx) => option.name && <li key={idx} className='hover:bg-gray-50 p-2 cursor-pointer flex flex-row gap-2 justify-start items-center' onClick={() => changeOption(idx, options)}>
                    <span>{option.name}</span>
                </li>)}
            </ul>}
        </div>
    )
}

export default Select


                    


