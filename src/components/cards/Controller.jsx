import { useState } from 'react'
import Toggle from '../../components/Switch';
import info from '../../assets/info.svg'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const Controller = ({ icon, name, count, unit, type, tooltip, minus, add }) => {
    const [webcam, setWebcam] = useState(false);
    const handleSwitch = (checked) => {
        setWebcam(checked);
    }
    const tooltipContent = 'When the countdown is finished, the system will automatically move to the next question.';
    return (
        <div className='shadow bg-white rounded-md flex flex-col justify-center items-center p-3 gap-3 lg:w-full mb-5'>
            <Tooltip id="info-tooltip" className='bg-white text-black rounded-md w-64 text-start shadow-sm' />
            <img src={info} alt="info" className='self-end cursor-pointer' data-tooltip-id={tooltip && 'info-tooltip'} data-tooltip-content={tooltipContent} />
            <img src={icon} alt={name} />
            <span className='font-medium whitespace-nowrap'>{name}</span>
            {type === 'count' && <div className='flex flex-row justify-center items-stretch gap-1'>
                <div className='rounded flex justify-center items-center bg-gray-350 text-gray-650 cursor-pointer' onClick={minus}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </div>
                <div className='rounded border border-blue-500 text-blue-500 px-4 py-1 text-xs w-full'>{count}{unit}</div>
                <div className='rounded flex justify-center items-center bg-gray-350 text-gray-650 cursor-pointer' onClick={add}>
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