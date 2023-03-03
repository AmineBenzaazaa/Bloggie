import { useState } from 'react'
import Navbar from './components/Navbar'
import Form from './components/cards/Form';
import './App.css'
import Image from './components/Upload/Image';
import File from './components/Upload/File';
import Question from './components/Upload/Question';
import Controller from './components/cards/Controller';
import dice from './assets/dice.svg'
import timeSlice from './assets/timeSlice.svg'
import webcam from './assets/webcam.svg'
import retry from './assets/retry.svg'
import clock from './assets/clock.svg'
import checked from './assets/checked.svg'

const controllers = [
  { icon: dice, name: 'Random questions', count: '10', type: 'count' },
  { icon: clock, name: 'Time per question', count: '45s', type: 'count' },
  { icon: checked, name: 'Passing score', count: '80%', type: 'count' },
  { icon: webcam, name: 'Webcam validation', count: '', type: 'switch' },
  { icon: timeSlice, name: 'Time expected', count: '30min', type: 'count' },
  { icon: retry, name: 'Attempts', count: '3', type: 'count' },
]

function App() {
  const [questions, setQuestions] = useState([{ id: 1 }, { id: 2 }])

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1 }])
  }
  const questionChange = (id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, text };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  }
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-7xl m-auto w-full">
        {/* Header */}
        <div className='flex justify-between items-center capitalize flex-col gap-3 sm:flex-row mb-5'>
          <span className='text-gray-700 font-medium'>edit training "working at height"</span>
          <div className='flex justify-between items-center gap-3'>
            <button className='text-gray-400 capitalize'>cancel</button>
            <button className='bg-orange-500 capitalize text-white'>update & save</button>
          </div>
        </div>
        {/* End header */}

        {/* Form */}
        <div className='flex flex-col sm:flex-row items-stretch gap-5 mb-5'>
          <div className='sm:w-[50%] rounded bg-white p-3'>
            <Form />
          </div>
          <div className='sm:w-[30%] rounded bg-white p-3 flex flex-col justify-between items-start gap-2'>
            <span className='text-sm text-gray-800'>Image</span>
            <Image />
            <span className='text-xs text-gray-300'>*Only JPG, PNG files are allowed. Image must be less than 2 MB</span>
          </div>
          <div className='sm:w-[20%] rounded bg-white p-3 flex flex-col justify-between items-start gap-2 overflow-hidden'>
            <span className='text-sm text-gray-800'>Training file</span>
            <File />
            <span className='text-xs text-gray-300'>*Only Video, PDF and SlideShow files are allowed.</span>
            <div className="flex items-center justify-center w-full">
              <hr className="border-gray-350 flex-grow border-t" />
              <div className="px-2 text-gray-500 text-xs font-bold">OR</div>
              <hr className="border-gray-350 flex-grow border-t" />
            </div>
            <span className='text-sm text-gray-800'>Media URL</span>
            <input type="text" placeholder='https://youtu.be/1g4hoZx8-o4' className='border text-xs outline-none rounded p-2 w-full' />
          </div>
        </div>
        {/* End form */}

        {/* Training quiz */}
        <div className='mb-5 bg-white p-3 text-start rounded'>
          <h2 className='text-sm text-gray-800'>Training quiz</h2>
          <p className='text-xs text-gray-450'>Here you can manage the questions by clicking on the “Add Question” button and choose from the available types of question. You can add up to 100 questions.</p>
          <hr className='my-2' />
          {(questions && questions.length > 0) && questions.map((question, idx) => <div className='bg-gray-425 rounded p-3 mb-2 border flex flex-col sm:flex-row gap-3 items-start' key={idx}>
            <div className='w-full sm:w-[70%]'>
              <div className='flex justify-between'>
                <h2 className='text-sm text-black mb-2 font-semibold'>Question {question.id}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-650 cursor-pointer" onClick={() => deleteQuestion(question.id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='bg-white border rounded p-3 text-xs mb-2'>
                Dust-filter respirators may be used for continuous protection while silica sand is used as the blasting abrasive.
              </div>
              <div className='bg-white border rounded p-2 flex justify-between items-center text-xs mb-2'>
                False
                <div className='flex flex-row items-center gap-2'>
                  <div className='rounded bg-green-300 text-green-400 p-1 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className='w-8 h-8'>
                    <Question />
                  </div>
                </div>
              </div>
              <div className='bg-white border rounded p-2 flex justify-between items-center text-xs mb-2'>
                True
                <div className='flex flex-row items-center gap-2'>
                  <div className='rounded bg-green-600 text-white p-1 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className='w-8 h-8'>
                    <Question />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-[30%]'>
              <div className='flex justify-between w-full'>
                <h2 className='text-sm text-black mb-2'>Question Image</h2>
                <span className='text-gray-650'>Optional</span>
              </div>
              <Image />
            </div>
          </div>)}
          {questions.length < 100 && <button type='button' className='font-semibold text-blue-500 bg-blue-300 w-full' onClick={addQuestion}>Add Question +</button>}
        </div>
        {/* End training quiz */}

        {/* Controllers */}
        <div className='mb-5 flex flex-col sm:flex-row gap-1 items-stretch'>
          {controllers.map((controller, idx) => <Controller key={idx} {...controller} />)}
        </div>
        {/* End Controllers */}

      </div>
    </>
  )
}

export default App
