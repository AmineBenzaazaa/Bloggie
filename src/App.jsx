import { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom"
import './App.css';

// ** components
import Header from './components/Header'
import Article from './components/Article'

// ** Pages
import Home from './pages/Home'
import SignUp from './pages/sign-Up'
import SignIn from './pages/sign-In'
import NotFound from './pages/notFound'
import Search from './pages/search'
import NewsAPI from './pages/newsAPI';


function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/sign-in');
    }
  }, [localStorage.getItem('token')])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/NewsAPI" element={<NewsAPI />} />
        <Route path="/OpenNews" element={<NewsAPI />} />
        <Route path="/NewsCred" element={<NewsAPI />} />
        <Route path="/TheGuardian" element={<NewsAPI />} />
        <Route path="/NewYorkTimes" element={<NewsAPI />} />
        <Route path="/BBCNews" element={<NewsAPI />} />
        <Route path='/search' element={<Search />} />
        <Route path="/article/:Id" element={<Article />} />
      </Routes>
    </>
  )
}

export default App
