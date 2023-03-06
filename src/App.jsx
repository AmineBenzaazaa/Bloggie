import './App.css'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Form from './components/cards/Form';
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

const acceptedFileTypes = ['image/jpeg', 'image/png'];

function App() {
  const [questions, setQuestions] = useState([{ id: 1 }, { id: 2 }])
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef(null);
  const [controllers, setControllers] = useState([
    { icon: dice, name: 'Random questions', count: 10, unit: '', type: 'count', tooltip: false },
    { icon: clock, name: 'Time per question', count: 45, unit: 's', type: 'count', tooltip: true },
    { icon: checked, name: 'Passing score', count: 80, unit: '%', type: 'count', tooltip: false },
    { icon: webcam, name: 'Webcam validation', count: '', unit: '', type: 'switch', tooltip: false },
    { icon: timeSlice, name: 'Time expected', count: 30, unit: 'min', type: 'count', tooltip: false },
    { icon: retry, name: 'Attempts', count: '3', unit: '', type: 'count', tooltip: false },
    { icon: dice, name: 'Random questions', count: 10, unit: '', type: 'count', tooltip: false },
    { icon: clock, name: 'Time per question', count: 45, unit: 's', type: 'count', tooltip: true },
    { icon: checked, name: 'Passing score', count: 80, unit: '%', type: 'count', tooltip: false },
  ])

  const decrementCount = (index) => {
    if (controllers[index].count == 0) return;
    const updated = controllers.slice();
    updated[index] = {
      ...updated[index],
      count: parseInt(updated[index].count) - 1
    }
    setControllers(updated)
  }
  const incrementCount = (index) => {
    if (controllers[index].count == 0) return;
    const updated = controllers.slice();
    updated[index] = {
      ...updated[index],
      count: parseInt(updated[index].count) + 1
    }
    setControllers(updated)
  }

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

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      setShowButton(container.scrollLeft > 0);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [])

  const handleClick = () => {
    containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="container max-w-7xl m-auto w-full px-5 xl:px-0">
        {/* Header */}
        <div className='flex justify-between items-center capitalize flex-col gap-3 sm:flex-row mb-3 text-start'>
          <span className='text-gray-700 w-full text-start font-[500]'>edit training "working at height"</span>
          <div className='flex justify-end items-center gap-5 w-full'>
            <button className='text-gray-400 capitalize p-0'>cancel</button>
            <button className='bg-orange-500 capitalize text-white px-10'>update & save</button>
          </div>
        </div>
        {/* End header */}

        {/* Form */}
        <div className='flex flex-col flex-wrap lg:flex-nowrap lg:flex-row items-stretch gap-5 mb-5'>
          <div className='shadow lg:w-[50%] rounded-md bg-white p-3'>
            <Form />
          </div>
          <div className='shadow lg:w-[30%] rounded-md bg-white p-3 flex flex-col justify-between items-start gap-2'>
            <span className='text-sm text-gray-800 font-[600]'>Image</span>
            <Image acceptedFileTypes={acceptedFileTypes} />
            <span className='text-xs text-gray-300'>*Only JPG, PNG files are allowed. Image must be less than 2 MB</span>
          </div>
          <div className='shadow lg:w-[20%] rounded-md bg-white p-3 flex flex-col justify-between items-start gap-2 overflow-hidden'>
            <span className='text-sm text-gray-800 font-[600]'>Training file</span>
            <File />
            <span className='text-xs text-gray-300'>*Only Video, PDF and SlideShow files are allowed.</span>
            <div className="flex items-center justify-center w-full">
              <hr className="border-gray-350 flex-grow border-t" />
              <div className="px-2 text-gray-500 text-xs font-bold">OR</div>
              <hr className="border-gray-350 flex-grow border-t" />
            </div>
            <span className='text-sm text-gray-800 font-[600]'>Media URL</span>
            <input type="text" placeholder='https://youtu.be/1g4hoZx8-o4' className='border text-xs outline-none rounded p-2 w-full' />
          </div>
        </div>
        {/* End form */}

        {/* Training quiz */}
        <div className='shadow mb-5 bg-white p-3 text-start rounded-md'>
          <h2 className='text-sm text-gray-800 font-[600]'>Training quiz</h2>
          <p className='text-xs text-gray-450'>Here you can manage the questions by clicking on the “Add Question” button and choose from the available types of question. You can add up to 100 questions.</p>
          <hr className='my-2' />
          {(questions && questions.length > 0) && questions.map((question, idx) => <div className='bg-gray-425 rounded-md p-3 mb-2 border flex flex-col sm:flex-row gap-10 items-start' key={idx}>
            <div className='w-full sm:w-[70%]'>
              <div className='flex justify-between'>
                <h2 className='text-sm text-gray-900 mb-2 font-[700]'>Question {question.id}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-650 cursor-pointer" onClick={() => deleteQuestion(question.id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='bg-white text-gray-800 font-[600] border rounded p-3 text-xs mb-2'>
                Dust-filter respirators may be used for continuous protection while silica sand is used as the blasting abrasive.
              </div>
              <div className='bg-white text-gray-800 font-[600] border rounded p-2 flex justify-between items-center text-xs mb-2'>
                False
                <div className='flex flex-row items-center gap-2'>
                  <div className='rounded-sm bg-green-200 text-green-300 p-1 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className='w-8 h-8'>
                    <Question acceptedFileTypes={acceptedFileTypes} />
                  </div>
                </div>
              </div>
              <div className='bg-white text-gray-800 font-[600] border rounded p-2 flex justify-between items-center text-xs mb-2'>
                True
                <div className='flex flex-row items-center gap-2'>
                  <div className='rounded-sm bg-green-600 text-white p-1 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className='w-8 h-8'>
                    <Question acceptedFileTypes={acceptedFileTypes} />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-[30%]'>
              <div className='flex justify-between w-full'>
                <h2 className='text-sm text-gray-800 mb-2 font-[600]'>Question Image</h2>
                <span className='text-gray-650'>Optional</span>
              </div>
              <Image />
            </div>
          </div>)}
          {questions.length < 100 && <button type='button' className='font-semibold text-blue-500 bg-blue-300 w-full' onClick={addQuestion}>Add Question +</button>}
        </div>
        {/* End training quiz */}

        {/* Controllers */}
        <div className='relative w-full mb-10'>
          <div className="scroll-container" ref={containerRef}>
            <div className='flex flex-row items-stretch gap-3 w-full'>
              {controllers.map((controller, idx) => (
                <div key={idx} className="flex-shrink-0 w-48">
                  <Controller {...controller} minus={() => decrementCount(idx)} add={() => incrementCount(idx)} />
                </div>
              ))}
            </div>
          </div>
          {showButton && <button onClick={handleClick} className='bg-white text-gray-450 h-fit p-1 rounded-md absolute -left-10 top-1/2 -translate-y-1/2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>}
        </div>

      </div>
    </>
  )
}

export default App
