import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Article from '../components/Article';
import { searchNewsApi } from '../stores/newsApi';
import { searchNyTimes } from '../stores/nytimes';
import { searchGuardian } from '../stores/guardian';

import noImg from '../assets/no_image.png'
import Filter from './filter';

const search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    const dispatch = useDispatch();
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const articleListRef = useRef(null);

    const shortenDescription = (description) => {
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
    useEffect(() => {
        console.log('page', page)
        Promise.all([dispatch(searchNyTimes({ param: q, page })), dispatch(searchGuardian(q)), dispatch(searchNewsApi(q, page))])
            .then(responses => {
                console.log(responses, responses[0], responses[1])
                const data = [];
                responses.forEach(response => {
                    if (response.payload) {
                        response.payload.forEach(article => {
                            if (response.type.startsWith('nyTimes')) {
                                data.push({
                                    id: article._id,
                                    title: article.abstract,
                                    description: shortenDescription(article.lead_paragraph),
                                    author: article.byline.original ? article.byline.original : 'Unknown', // author image
                                    image: getArticleImage(article) ? getArticleImage(article) : noImg,
                                    link: article.web_url,
                                })
                            }
                            if (response.type.startsWith('guardian')) {
                                data.push({
                                    id: article.id,
                                    title: article.webTitle,
                                    description: shortenDescription(article.webTitle),
                                    author: article.sectionName ? article.sectionName : 'Unknown', // author image
                                    image: article.urlToImage ? article.urlToImage : noImg,
                                    link: article.webUrl,
                                })
                            }
                            if (response.type.startsWith('newsapi')) {
                                data.push({
                                    id: article.id,
                                    title: article.webTitle,
                                    description: shortenDescription(article.description),
                                    author: article.author ? article.author : 'Unknown', // author image
                                    image: article.urlToImage ? article.urlToImage : noImg,
                                    link: article.webUrl,
                                })
                            }
                        });
                    } else {
                        throw new Error(`No payload found for ${response.type}.`);
                    }
                });
                setArticles([...articles, ...data]);
            })
            .catch(error => console.log("Error while fetching articles", error));
    }, [q, dispatch, page]);


    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /* useEffect(() => {
        if(articles.length == 0) return;
        if (articleListRef.current) {
            const articleList = articleListRef.current;
            const lastArticle = articleList.lastChild;
            // if (lastArticle) {
            //     lastArticle.scrollIntoView({ behavior: 'smooth' });
            // }
        }
    }, [articles]); */

    return (
        <section className='flex flex-col justify-start items-end max-w-7xl mx-[10%] pr-10 py-10' ref={articleListRef}>
            <h1 className='font-bold text-gray-700 text-4xl w-full mb-10'>Results for <span className='text-black'>{q}</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {articles && articles.length > 0 && articles.map((article, index) => <Article key={index} {...article} />)}
            </div>
            {loading && <p>Loading more articles...</p>}
        </section>
    )
}

export default search