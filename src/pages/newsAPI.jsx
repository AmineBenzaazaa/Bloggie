import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsApi } from '../stores/newsApi'
import {useParams} from 'react-router-dom';
import { Route, Routes,Link } from "react-router-dom"
import Filter from '../pages/filter'
import noImg from '../assets/no_image.png'
import Article from '../components/Article';

const newsAPI = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([])
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    Promise.all([dispatch(getNewsApi(page))]).then(responses => {
      const data = [];
      console.log('responses', responses);
      responses.forEach(res => {
        if (res.payload) {
          res.payload.forEach(article => {
            if (res.type.startsWith('newsApi')) {
              data.push({
                id: 'newsApi_' + article.publishedAt,
                title: article.title,
                description: article.title,
                author: article.author ? article.author : 'Unknown', // author image
                image: article.urlToImage ? article.urlToImage : noImg,
                link: article.url,
                _createdAt: article.publishedAt,
              })
            }
          })
        } else {
          throw new Error(`No payload found for ${res.type}`)
        }
      });
      setArticles([...articles, ...data]);
    }).catch(err => console.log('error fetch articles', err))
  }, [dispatch, page, isFiltering]);
  
  const shortenDescription = (description) => {
      if (!description) {
        return '';
      }

      const words = description.split(' ');
      if (words.length > 30) {
        return words.slice(0, 30).join(' ') + '...';
      }
      return description;
    };

  return (
    <div className="mx-auto max-w-7xl">


      <Filter />
      <div className="mx-auto md:max-w-6xl lg:max-w-7xl py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
          {articles && articles.length>0 && articles.map((article,index) => (
            <Link key={index} to={`/single/${article.id}`} className="group cursor-pointer overflow-hidden rounded-lg border">
              {article.image && (
                <img
                  key={article._id}
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={article.image?article.image:noImg}
                  alt="Article Image"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                <p className="text-sm mb-2">{shortenDescription(article.description)}</p>
                <p className="text-xs text-gray-600">
                  Source <span className="text-xs text-blue-600 italic"> {article.author ? article.author : 'Unknown'}
                  </span> Published at <span className="text-xs text-blue-600 italic"> {new Date(article._createdAt).toLocaleString('en-us')} </span> 
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center py-4">
          <button onClick={() => setPage(page + 1)} className="bg-blue-600 hover:bg-black text-white  py-2 px-4 rounded" >Load More</button>
        </div>
      </div>
    </div>
  );
}

export default newsAPI