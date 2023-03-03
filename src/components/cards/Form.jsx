
import React from 'react'
import Select from '../Select'
import vest from '../../assets/vest.svg'
import vca from '../../assets/vca.svg'
import trash from '../../assets/trash.svg'

const categories = [
    { icon: vest, name: 'Safety' }
]
const topics = [
    { icon: vca, name: 'VCA' }
]
const range = [
    { name: '1 year' },
    { name: '5 year' }
]

const departments = [
    { name: 'No records to show' }
]
const functions = [
    { name: 'No records to show' }
]
const workers = [
    { name: "Internal workers" }
]

const Form = () => {
    return (
        <div className='text-xs text-start whitespace-nowrap'>
            {/* First row */}
            <div className='flex flex-col sm:flex-row gap-2 mb-3'>
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex flex-row gap-3 justify-between'>
                        <span>Category</span>
                        <span className='text-blue-500 cursor-pointer'>Add new +</span>
                    </div>
                    <Select options={categories} selected={categories[0]} />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex flex-row gap-3 justify-between'>
                        <span>Topic</span>
                        <span className='text-blue-500 cursor-pointer'>Add new +</span>
                    </div>
                    <Select options={topics} selected={topics[0]} />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span>Valid For</span>
                    <Select options={range} selected={range[0]} />
                </div>
            </div>
            {/* Second row */}
            <div className='flex flex-col sm:flex-row gap-2 mb-3'>
                <div className='flex flex-col gap-1 sm:w-[60%]'>
                    <span className='capitalize'>Training</span>
                    <div className='border flex justify-between items-center p-2 rounded'>
                        <span className='font-semibold'>Working at height</span>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <img src={vca} alt='trash icon' className='object-cover' />
                            <img src={trash} alt='trash icon' className='object-cover' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1 sm:w-[40%]'>
                    <span className='capitalize'>Assign To</span>
                    <Select options={workers} selected={workers[0]} />
                </div>
            </div>
            {/* Third row */}
            <div className='flex flex-col sm:flex-row items-stretch gap-2'>
                <div className='flex flex-col w-full gap-1'>
                    <div>
                        <div className='flex flex-row justify-between items-center mb-1'>
                            <span>Departments</span>
                            <span>Optional</span>
                        </div>
                        <Select options={departments} placeholder="Select departments" />
                    </div>
                    <div>
                        <div className='flex flex-row justify-between items-center mb-1'>
                            <span>Functions</span>
                            <span>Optional</span>
                        </div>
                        <Select options={functions} placeholder="Select functions" />
                    </div>
                </div>
                <div className='w-full h-fit overflow-hidden'>
                    <p className='mb-1'>Description</p>
                    <textarea name="" id="" cols="30" rows="5" className='border rounded w-full h-full'></textarea>
                </div>
            </div>
        </div>
    )
}

export default Form