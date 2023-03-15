import React from 'react'
import {useParams} from 'react-router-dom';

const Article = ({ image, title, description, author, authorSrc }) => {
    function trimString(str, maxLength = 20) {
        if (str && str.length > maxLength) {
            return str.slice(0, maxLength) + "...";
        }
        return str;
    }
    const _title = trimString(title);
    const _author = trimString(author);
    const _description = trimString(description, 100);
    

    return (
        <div className="group cursor-pointer overflow-hidden rounded-lg border" >
            {image && <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={image}
                alt="Post Image"
            />}
            <div className="flex justify-between bg-white p-5 h-full">
                <div>
                    <p className="text-lg font-bold">{_title}</p>
                    <p className="tex-xs">
                        {_description} {author ? ' by ' + _author : null}
                    </p>
                </div>
                {authorSrc && <img
                    className="h-12 w-12 rounded-full"
                    src={authorSrc}
                    alt="author's Image"
                />}
            </div>
        </div>
    )
}

export default Article