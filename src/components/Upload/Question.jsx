import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import cloud from '../../assets/cloudUpload.svg'

const Image = ({ acceptedFileTypes }) => {
    const [file, setFile] = useState({})
    const [change, setChange] = useState(false)
    const [error, setError] = useState(false)
    const maxFileSize = 2 * 1024 * 1024;
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: files => {
            if (!acceptedFileTypes) return setFile(files.map(file => Object.assign(file))[0])
            const validFiles = files.filter(file => maxFileSize && acceptedFileTypes.includes(file.type))
            if (validFiles && validFiles.length > 0) {
                setError(false)
                return setFile(validFiles.map(file => Object.assign(file))[0])
            }
            else
                return setError(true)
        }
    })

    return (
        <>
            {!(file && Object.keys(file).length > 0) ? <div {...getRootProps({ className: 'dropzone text-xs flex flex-col gap-2 justify-center items-center rounded w-full h-full cursor-pointer text-center' })} title="Upload image">
                <input {...getInputProps()} />
                <img src={cloud} alt="upload icon" className='object-cover' />
            </div> : file.type.startsWith('image') && <div className='w-full h-full relative' onMouseEnter={() => setChange(true)} onMouseLeave={() => setChange(false)}>
                <img src={URL.createObjectURL(file)} alt={file.name} className='object-cover rounded w-full h-full' />
                {change && <div {...getRootProps({ className: 'hover:bg-black/[.5] absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-sm rounded cursor-pointer' })}>
                    <input {...getInputProps()} />
                    <img src={cloud} alt="upload icon" className='w-3 h-3' />
                </div>}
            </div>}
        </>
    )
}

export default Image