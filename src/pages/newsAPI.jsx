import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsApi } from '../stores/newsApi'
import {useParams} from 'react-router-dom';
import { Route, Routes,Link } from "react-router-dom"
import Banner from '../components/Banner'
import Filter from '../pages/filter'

const newsAPI = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const newsApiData = useSelector((state) => state.newsApi.data.articles);
    useEffect(() => {
      dispatch(getNewsApi());
    }, [dispatch]);
    console.log(params);
    console.log(newsApiData);
    
  
    const shortenDescription = (description) => {
      const words = description.split(' ');
      if (words.length > 30) {
        return words.slice(0, 30).join(' ') + '...';
      }
      return description;
    };
  
    return (
      <div className="mx-auto max-w-7xl">
        {/* <Head>
          <title>Medium</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
  
        
        <Filter />
        <div className="mx-auto max-w-7xl py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
          {newsApiData&& newsApiData.length>0 && newsApiData.map((article) => (
            <Link key={article.title} className="group cursor-pointer overflow-hidden rounded-lg border" to={`/article/${article.id}`}>
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={article.urlToImage}
                alt="Article Image"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                <p className="text-sm mb-2">{shortenDescription(article.description)}</p>
                <p className="text-xs text-gray-600">
                  By <span className="text-xs text-blue-600 italic"> {article.author ? article.author : 'Unknown'}</span>  from <span className="text-xs text-blue-600 italic"> {article.source.name} </span> 
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    );
  }

export default newsAPI