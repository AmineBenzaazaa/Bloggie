import './App.css';
import { useEffect, useState } from 'react';
import { getNewsApi } from './stores/newsapi';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.newsApi);
  useEffect(() => {
    dispatch(getNewsApi())
  }, [dispatch])

  return (
    <>
      Hello world!
    </>
  )
}

export default App
