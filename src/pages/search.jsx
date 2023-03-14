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
    const newsapi = useSelector(state => state.newsApi)
    const nytimes = useSelector(state => state.nyTimes)
    const guardian = useSelector(state => state.guardian)
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1
        }
        console.log('guardian',guardian);
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) observer.observe(loader.current);
    }, []);

    // const handleObserver = (entities, observer) => {
    //     const target = entities[0];
    //     console.log("page in intersection", target.isIntresecting)
    //     if (target.isIntresecting) {
    //         setPage(page + 1)
    //         observer.unobserve(target)
    //     }
    // }

    const handleObserver = (entities, observer) => {
        const target = entities[0];
        console.log("page in intersection", target.isIntersecting)
        if (target.isIntersecting) {
            setPage(page + 1);
            observer.unobserve(target);
        }
    };
    const shortenDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 30) {
          return words.slice(0, 30).join(' ') + '...';
        }
        return description;
      };
    useEffect(() => {
        console.log(page)
        Promise.all([dispatch(searchNyTimes({ param: q, page })), dispatch(searchGuardian(q)),dispatch(searchNewsApi(q,page))])
            .then(responses => {
                // console.log(responses[0], responses[1])
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
                                    image: getArticleImage(article)?getArticleImage(article):noImg,
                                    link: article.web_url,
                                })
                            }
                            if (response.type.startsWith('guardian')) {
                                data.push({
                                    id: article.id,
                                    title: article.webTitle,
                                    description: shortenDescription(article.webTitle),
                                    author: article.sectionName ? article.sectionName : 'Unknown', // author image
                                    image: article.urlToImage?article.urlToImage:noImg,
                                    link: article.webUrl,
                                })
                            }
                            if (response.type.startsWith('newsapi')) {
                                data.push({
                                    id: article.id,
                                    title: article.webTitle,
                                    description: shortenDescription(article.description),
                                    author:  article.author ? article.author : 'Unknown', // author image
                                    image: article.urlToImage?article.urlToImage:noImg,
                                    link: article.webUrl,
                                })
                            }
                        });
                    } else {
                        throw new Error(`No payload found for ${response.type}.`);
                    }
                });
                setArticles(data);
            })
            .catch(error => console.log("Error while fetching articles", error));
    }, [q, dispatch, page]);

    return (
        <section className='flex flex-row justify-start max-w-7xl mx-[10%]'>
            
            <section className=' pr-10 py-10'>
                <h1 className='font-bold text-gray-700 text-4xl mb-10'>Results for <span className='text-black'>{q}</span></h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {articles && articles.length > 0 && articles.map((article, index) => <Article key={index} {...article} />)}
                </div>
                <div ref={loader}>Loading...</div>
            </section>
            
        </section>
    )
}

export default search