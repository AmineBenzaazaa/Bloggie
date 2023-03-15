import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
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
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem('token') && location.pathname !== '/sign-up' && location.pathname !== '/') {
      navigate('/sign-in');
    }
  }, [localStorage.getItem('token'), location.pathname])

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
        <Route path="/article/:id" render={({ match }) => (
          <Article articleData={newsApiData[match.params.id]} />
        )} />

      </Routes>
    </>
  )
}

export default App
