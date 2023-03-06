
import React, { useState } from 'react'
import Select from '../Select'
import vest from '../../assets/vest.svg'
import vca from '../../assets/vca.svg'
import trash from '../../assets/trash.svg'

const categories = [
    { icon: vest, name: 'Safety' },
]
const topics = [
    { icon: vca, name: 'VCA' },
]
const range = [
    { name: '1 year' },
    { name: '5 years' }
]

const departments = [
    // { name: 'No records to show' }
]
const functions = [
    // { name: 'No records to show' }
]
const workers = [
    { name: "Internal workers" }
]

const Form = () => {
    const [selected, setSelected] = useState({})
    const handleSelected = (index, items) => {
        setSelected(items[index])
    }
    return (
        <div className='text-xs text-start whitespace-nowrap'>
            {/* First row */}
            <div className='flex flex-col sm:flex-row gap-2 mb-3 items-stretch'>
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex flex-row gap-3 justify-between'>
                        <span className='text-gray-800 font-medium'>Category</span>
                        <span className='text-blue-500 cursor-pointer'>Add new +</span>
                    </div>
                    <Select options={categories} />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex flex-row gap-3 justify-between'>
                        <span className='text-gray-800 font-medium'>Topic</span>
                        <span className='text-blue-500 cursor-pointer'>Add new +</span>
                    </div>
                    <Select options={topics} />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-gray-800 font-medium'>Valid For</span>
                    <Select options={range} />
                </div>
            </div>
            {/* Second row */}
            <div className='flex flex-col sm:flex-row gap-2 mb-3'>
                <div className='flex flex-col gap-1 sm:w-[60%]'>
                    <span className='capitalize text-gray-800 font-medium'>Training</span>
                    <div className='border flex justify-between items-center p-2 rounded'>
                        <span className='font-semibold'>Working at height</span>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <img src={vca} alt='trash icon' className='object-cover' />
                            <img src={trash} alt='trash icon' className='object-cover' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1 sm:w-[40%]'>
                    <span className='capitalize text-gray-800 font-medium'>Assign To</span>
                    <Select options={workers} />
                </div>
            </div>
            {/* Third row */}
            <div className='flex flex-col sm:flex-row items-stretch gap-2'>
                <div className='flex flex-col w-full gap-1'>
                    <div>
                        <div className='flex flex-row justify-between items-center mb-1'>
                            <span className='text-gray-800 font-medium'>Departments</span>
                            <span>Optional</span>
                        </div>
                        <Select options={departments} placeholder="Select departments" />
                    </div>
                    <div>
                        <div className='flex flex-row justify-between items-center mb-1'>
                            <span className='text-gray-800 font-medium'>Functions</span>
                            <span>Optional</span>
                        </div>
                        <Select options={functions} placeholder="Select functions" />
                    </div>
                </div>
                <div className='w-full h-fit overflow-hidden'>
                    <p className='text-gray-800 font-medium mb-1'>Description</p>
                    <textarea name="" id="" cols="30" rows="5" className='border rounded w-full h-full'></textarea>
                </div>
            </div>
        </div>
    )
}

export default Form