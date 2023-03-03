import { useState } from 'react'
import Toggle from '../../components/Switch';
import info from '../../assets/info.svg'

const Controller = ({ icon, name, count, type }) => {
    const [webcam, setWebcam] = useState(false);
    const handleSwitch = (checked) => {
        setWebcam(checked);
    }
    return (
        <div className='bg-white rounded flex flex-col justify-center items-center p-3 gap-3 w-full'>
            <img src={info} alt="info" className='self-end' />
            <img src={icon} alt="" />
            <span className='font-medium whitespace-nowrap'>{name}</span>
            {type === 'count' && <div className='flex flex-row justify-center items-stretch gap-1'>
                <div className='rounded flex justify-center items-center bg-gray-350 text-gray-650'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </div>
                <div className='rounded border border-blue-500 text-blue-500 px-3'>{count}</div>
                <div className='rounded flex justify-center items-center bg-gray-350 text-gray-650'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>}
            {type === 'switch' && <Toggle id="webcam" checked={webcam} onChange={handleSwitch} />}
        </div>
    )
}

export default Controller