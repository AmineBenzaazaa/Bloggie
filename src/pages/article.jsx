import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
const Article = ({ articleData }) => {
    console.log(articleData);
    return (
      <div>
        <h1>{articleData.title}</h1>
        <p>{articleData.description}</p>
      </div>
    );
  };
  

export default Article
