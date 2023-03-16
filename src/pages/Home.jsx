import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsApi } from '../stores/newsApi'
import { Helmet } from 'react-helmet';
import { NavLink, useParams } from 'react-router-dom';
import { Route, Routes, Link } from "react-router-dom"
import Filter from '../pages/filter'
import noImg from '../assets/no_image.png'
import { getGuardianNews } from '../stores/guardian';
import { getNytNews } from '../stores/nytimes';
import Article from '../components/Article';


const home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([])
  const [isFiltering, setIsFiltering] = useState(false);
  const newsApi = useSelector(state => state.newsApi);
  const nyTimes = useSelector(state => state.nyTimes);
  const guardian = useSelector(state => state.guardian);
  useEffect(() => {
    Promise.all([dispatch(getNytNews(page)), dispatch(getGuardianNews(page + 1)), dispatch(getNewsApi(page))]).then(responses => {
      const data = [];
      console.log('responses', responses);
      responses.forEach(res => {
        if (res.payload) {
          res.payload.forEach(article => {
            if (res.type.startsWith('nyTimes')) {
              data.push({
                id: 'nyTimes_' + article.pub_date,
                title: article.abstract,
                description: article.lead_paragraph,
                author: article.byline.original ? article.byline.original : 'Unknown', // author image
                image: getArticleImage(article) ? getArticleImage(article) : noImg,
                link: article.web_url,
                _createdAt: article.pub_date,
              })
            }
            if (res.type.startsWith('newsApi')) {
              data.push({
                id: 'newsApi_' + article.publishedAt,
                title: article.title,
                description: article.title,
                author: article.source ? article.source.name : 'Unknown', // author image
                image: article.urlToImage ? article.urlToImage : noImg,
                link: article.url,
                _createdAt: article.publishedAt,

              })
            }
            if (res.type.startsWith('guardian')) {
              data.push({
                id: 'guardian_' + article.webPublicationDate,
                title: article.webTitle,
                description: article.webTitle,
                author: article.sectionName ? article.sectionName : 'Unknown', // author image
                image: article.urlToImage ? article.urlToImage : noImg,
                link: article.webUrl,
                _createdAt: article.webPublicationDate,
              })
            }
          })
        } else {
          throw new Error(`No payload found for ${res.type}`)
        }
      });
      setArticles([...articles, ...data]);
    }).catch(err => console.log('error fetch articles', err))
  }, [dispatch, page]);

  useEffect(() => {
    if (isFiltering === 0 && newsApi.filteredData && newsApi.filteredData.length > 0) {
      console.log('newsapi', newsApi.filteredData)
      const data = newsApi.filteredData.map((article) => {
        return {
          id: 'guardian_' + article.webPublicationDate,
          title: article.webTitle,
          description: article.webTitle,
          author: article.sectionName ? article.sectionName : 'Unknown', // author image
          image: article.urlToImage ? article.urlToImage : noImg,
          link: article.webUrl,
        }
      })
      if (data && data.length > 0) setArticles(data)
    }
    if (isFiltering === 1 && guardian.filteredData && guardian.filteredData.length > 0) {
      console.log('guardian', guardian.filteredData)
      const data = guardian.filteredData.map((article) => {
        return {
          id: 'guardian_' + article.webPublicationDate,
          title: article.webTitle,
          description: article.webTitle,
          author: article.sectionName ? article.sectionName : 'Unknown', // author image
          image: article.urlToImage ? article.urlToImage : noImg,
          link: article.webUrl,
        }
      })
      if (data && data.length > 0) setArticles(data)
    }
    if (isFiltering === 2 && nyTimes.filteredData && nyTimes.filteredData.length > 0) {
      console.log('nyTimes filteredData', nyTimes.filteredData)
      const data = nyTimes.filteredData.map((article) => {
        return {
          id: 'nyTimes_' + article.pub_date,
          title: article.abstract,
          description: article.lead_paragraph,
          author: article.byline.original ? article.byline.original : 'Unknown', // author image
          image: getArticleImage(article) ? getArticleImage(article) : noImg,
          link: article.web_url,
        }
      })
      if (data && data.length > 0) setArticles(data)
    }
  }, [isFiltering])

  const getArticleImage = (article) => {
    const multimedia = article.multimedia || [];
    const image = multimedia.find((item) => item.type === 'image');
    if (image) {
      return `https://www.nytimes.com/${image.url}`;
    }
    return null;
  };

  return (
    <div>
      <Helmet>
        <title>Bloggie</title>
        <link rel="icon" href="./assets/Bloggie_fav.png" />
      </Helmet>
      <Filter isFiltering={isFiltering} setIsFiltering={setIsFiltering} />
      <div className="mx-auto sm:max-w-5xl lg:max-w-7xl py-4 px-5 lg:px-0">
        <div className="title ">
          <p className="mb-4 text-4xl font-bold text-black">
            Lastest articles
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
          {(articles && articles.length > 0) && articles.map((article, index) => (
            <Link key={index} to={`/single/${article.id}`} >
              <Article {...article} />
            </Link>
          ))}
        </div>
        {(articles && articles.length > 0) && <div className="flex justify-center py-4">
          <button onClick={() => setPage(page + 1)} className="bg-blue-600 hover:bg-black text-white  py-2 px-4 rounded">Load More</button>
        </div>}
      </div>
    </div>
  );
};
export default home