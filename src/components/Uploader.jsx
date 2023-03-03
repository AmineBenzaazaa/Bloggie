import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import cloud from '../assets/cloudUpload.svg'

const Uploader = () => {
    const [file, setFile] = useState({})
    const [change, setChange] = useState(false)
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: fl => {
            setFile(fl.map(fl => Object.assign(fl))[0])
            // setFile({ ...file, ...fl.map(fl => Object.assign(fl)) })
        }
    })

    return (
        <>
            {!(file && Object.keys(file).length > 0) ? <div {...getRootProps({ className: 'dropzone border border-dashed text-xs flex flex-col gap-2 justify-center items-center rounded w-full h-full p-5 cursor-pointer' })}>
                <input {...getInputProps()} />
                <img src={cloud} alt="" />
                <p className='text-gray-400'>
                    Drag and drop you image here or <span className='text-blue-400'>browse files</span>
                </p>
            </div> : file.type.startsWith('image') && <div className='w-full h-full relative' onMouseEnter={() => setChange(true)} onMouseLeave={() => setChange(false)}>
                <img src={URL.createObjectURL(file)} alt={file.name} className='object-cover rounded w-full h-full' />
                {change && <div {...getRootProps({ className: 'hover:bg-black/[.5] absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-sm rounded cursor-pointer' })}>
                    <input {...getInputProps()} />
                    Tap to change
                </div>}
            </div>}
        </>
    )
}

export default Uploader