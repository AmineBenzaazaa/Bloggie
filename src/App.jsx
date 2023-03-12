import './App.css';
import { useEffect, useState } from 'react';
import { getNewsApi } from './stores/newsapi';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom"

import Header from './components/Header'
import Home from './pages/Home'
import SignUp from './pages/sign-Up'
import SignIn from './pages/sign-In'
import NotFound from './pages/notFound'


function App() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.newsApi);
  useEffect(() => {
    dispatch(getNewsApi())
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
 