import './App.css';
import { useEffect, useState } from 'react';
import { getNewsApi } from './stores/newsapi';
import { useDispatch, useSelector } from 'react-redux';
import { getGuardianNews } from './stores/guardian';
import { getNytNews } from './stores/nytimes';
import { Route, Routes } from "react-router-dom"

import Header from './components/Header'
import Home from './pages/Home'
import SignUp from './pages/sign-Up'
import SignIn from './pages/sign-In'
import NotFound from './pages/notFound'
import Search from './pages/search'


function App() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.newsApi);
  useEffect(() => {
    dispatch(getNewsApi())
    dispatch(getGuardianNews())
    dispatch(getNytNews())
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </>
  )
}

export default App
 