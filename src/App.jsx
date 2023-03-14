import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGuardianNews } from './stores/guardian';
import { getNytNews } from './stores/nytimes';
import { Route, Routes } from "react-router-dom"
import { getNewsApi } from './stores/newsapi';
import './App.css';

// ** components
import Header from './components/Header'

// ** Pages
import Home from './pages/Home'
import SignUp from './pages/sign-Up'
import SignIn from './pages/sign-In'
import NotFound from './pages/notFound'
import Search from './pages/search'
import NewsAPI from './pages/newsAPI';
import Guardian from './pages/Guardian'
import NewYorkTimes from './pages/nyTimes'
import Article from './pages/Article'


function App() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.newsApi);
  // useEffect(() => {
  //   dispatch(getNewsApi())
  //   dispatch(getGuardianNews())
  //   dispatch(getNytNews())
  // }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/NewsAPI" element={<NewsAPI/>}/>
        <Route path="/TheGuardian" element={<Guardian/>}/>
        <Route path="/NewYorkTimes" element={<NewYorkTimes/>}/>
        <Route path="/OpenNews" element={<NewsAPI/>}/>
        <Route path="/NewsCred" element={<NewsAPI/>}/>
        <Route path="/BBCNews" element={<NewsAPI/>}/>
        <Route path='/search' element={<Search />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </>
  )
}

export default App
 