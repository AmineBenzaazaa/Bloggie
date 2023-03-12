import './App.css';
import { useEffect, useState } from 'react';
import { getNewsApi } from './stores/newsapi';
import { useDispatch, useSelector } from 'react-redux';
import { getGuardianNews } from './stores/guardian';
import { getNytNews } from './stores/nytimes';

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
      Hello world!
    </>
  )
}

export default App
