import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Article from '../components/Article';
import { searchNewsApi } from '../stores/newsApi';
import { searchNyTimes } from '../stores/nytimes';
import { searchGuardian } from '../stores/guardian';

const search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    const dispatch = useDispatch();
    const newsapi = useSelector(state => state.newsApi)
    const nytimes = useSelector(state => state.nyTimes)
    const guardian = useSelector(state => state.guardian)
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        dispatch(searchNewsApi(q))
        dispatch(searchNyTimes(q))
        dispatch(searchGuardian(q))
    }, [q])

    return (
        <section className='flex flex-row justify-start max-w-7xl mx-[10%]'>
            <section className='w-[70%] pr-10 py-10'>
                <h1 className='font-bold text-gray-700 text-4xl mb-10'>Results for <span className='text-black'>{q}</span></h1>
                {/* <Tabs /> */}
                <div className='grid grid-cols-2 gap-5'>
                    {articles && articles.length > 0 && articles.map(article => <Article {...article} />)}
                </div>
            </section>
            <section className='w-[30%] py-10 border-l'></section>
        </section>
    )
}

export default search