
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
        // accept: acceptedFileTypes.join(),
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
            {!(file && Object.keys(file).length > 0) ? <div {...getRootProps({ className: `dropzone border-2 border-dashed text-xs flex flex-col gap-2 justify-center items-center rounded w-full h-full p-5 cursor-pointer text-center ${error ? 'border-red-500' : ''}` })}>
                <input {...getInputProps()} />
                <img src={cloud} alt="download icon" />
                <p className='text-gray-400 whitespace-nowrap'>
                    Drag and drop you image here <br /> Or <span className='text-blue-400'>browse files</span>
                </p>
            </div> : file.type.startsWith('image') && <div className='w-full h-full relative' onMouseEnter={() => setChange(true)} onMouseLeave={() => setChange(false)}>
                <img src={URL.createObjectURL(file)} alt={file.name} className='object-cover rounded w-full h-full max-h-60' />
                {change && <div {...getRootProps({ className: 'hover:bg-black/[.5] absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-sm rounded cursor-pointer' })}>
                    <input {...getInputProps()} />
                    Tap to change
                </div>}
            </div>}
        </>
    )
}

export default Image