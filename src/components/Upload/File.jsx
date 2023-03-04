import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import cloud from '../../assets/cloudUpload.svg'

const File = () => {
    const [file, setFile] = useState({})
    const [error, setError] = useState(false)
    const acceptedFileTypes = ['video/mp4', 'video/avi', 'video/wmv', 'video/quicktime', 'application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.oasis.opendocument.presentation', 'application/x-iwork-keynote-sffkey'];

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
        },
        onDrop: files => {
            const validFiles = files.filter(file => acceptedFileTypes.includes(file.type))
            if (validFiles && validFiles.length > 0) {
                setError(false)
                setFile(validFiles.map(file => Object.assign(file))[0])
            }
            else
                setError(true)
        }
    })

    return (
        <>
            <div {...getRootProps({ className: `dropzone border border-dashed text-xs flex flex-col gap-2 justify-center items-center rounded w-full h-full p-5 cursor-pointer ${error ? 'border-red-500' : ''}` })}>
                <input {...getInputProps()} />
                <img src={cloud} alt="" />
                <p className='text-gray-400'>
                    Drag and drop your file here <br /> Or <span className='text-blue-400'>browse files</span>
                </p>
            </div>

            {(file && Object.keys(file).length > 0) && <div className='rounded bg-green-600 p-2 flex justify-between items-center text-xs w-full text-white'>
                <div className='text-start text-xs'>
                    <p>Completed</p>
                    <p>{file.name}</p>
                </div>
                <div className='rounded-full p-1 bg-gray-350 text-gray-700 cursor-pointer' onClick={() => setFile({})}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
                        className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>}
        </>
    )
}

export default File