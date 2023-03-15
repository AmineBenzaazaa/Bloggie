import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNytNews } from '../stores/nytimes'
import { useParams } from 'react-router-dom';
import { Route, Routes, Link } from "react-router-dom"
import Banner from '../components/Banner'
import Filter from '../pages/filter'
import noImg from '../assets/no_image.png'


const Guardian = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [pageNum, setPageNum] = useState(1); // keep track of the page number
    useEffect(() => {
      dispatch(getNytNews(pageNum));
    }, [dispatch, pageNum]);
    const NytNewsData = useSelector((state) => state.nyTimes.data);
    console.log('NytNewsData', NytNewsData);
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

    const getArticleImage = (article) => {
        const multimedia = article.multimedia || [];
        const image = multimedia.find((item) => item.type === 'image');
        if (image) {
          return `https://www.nytimes.com/${image.url}`;
        }
        return null;
    };

    const handleLoadMore = () => {
      setPageNum(pageNum + 1); // increment the page number when the button is clicked
    }

    return (
      <div className="mx-auto max-w-7xl">
        {/* <Head>
          <title>Medium</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}


        <Filter />
        <div className="mx-auto md:max-w-6xl lg:max-w-7xl py-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
            {NytNewsData && NytNewsData.length>0 && NytNewsData.map((article) => (
              <Link key={article._id} className="group cursor-pointer overflow-hidden rounded-lg border" to={`/article/${article._id}`}>
                {getArticleImage(article) && (
                  <img
                    key={article._id}
                    className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                    src={getArticleImage(article)?getArticleImage(article):noImg}
                    alt="Article Image"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{article.abstract}</h2>
                  <p className="text-sm mb-2">{shortenDescription(article.lead_paragraph)}</p>
                  <p className="text-xs text-gray-600">
                     <span className="text-xs text-blue-600 italic"> {article.byline.original ? article.byline.original : 'Unknown'}</span>  source <span className="text-xs text-blue-600 italic"> {article.source} </span> 
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center py-4">
            <button className="bg-black hover:bg-black text-white  py-2 px-4 rounded" onClick={handleLoadMore}>Load More</button>
          </div>
        </div>
      </div>
    );
  }

export default Guardian
