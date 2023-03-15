import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGuardianNews } from '../stores/guardian'
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
      dispatch(getGuardianNews(pageNum));
    }, [dispatch, pageNum]);
    
    const GuardianData = useSelector((state) => state.guardian.data);
    console.log('GuardianData', GuardianData);

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

    const handleLoadMore = () => {
      setPageNum(pageNum + 1); // increment the page number when the button is clicked
    }

    return (
      <div className="mx-auto max-w-7xl">
      

        <Filter />
        <div className="mx-auto md:max-w-6xl lg:max-w-7xl py-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
            {GuardianData && GuardianData.length>0 && GuardianData.map((article) => (
              <Link key={article.webTitle} className="group cursor-pointer overflow-hidden rounded-lg border" to={`/article/${article.id}`}>
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={article.urlToImage?article.urlToImage:noImg}
                  alt="Article Image"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{article.webTitle}</h2>
                  <p className="text-sm mb-2">{shortenDescription(article.webTitle)}</p>
                  <p className="text-xs text-gray-600">
                    Section <span className="text-xs text-blue-600 italic"> {article.sectionName ? article.sectionName : 'Unknown'}</span>  type <span className="text-xs text-blue-600 italic"> {article.type} </span> 
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
