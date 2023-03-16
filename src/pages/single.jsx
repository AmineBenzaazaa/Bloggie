import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PortableText from 'react-portable-text'
import noImg from '../assets/no_image.png'
const single = () => {
    const newTimes = useSelector(state => state.nyTimes)
    const guardian = useSelector(state => state.guardian)
    const newsAPI = useSelector(state => state.newsApi)
    const [article, setArticle] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const source = id.split('_')[0]
        const _id = id.split('_')[1]
        if (source === 'nyTimes') {
            const article = newTimes.data.find((item) => item.pub_date == _id) 
            setArticle({
                title: article?.headline.main,
                description: article.lead_paragraph +' '+ article.snippet,
                author: article.byline.original ? article.byline.original : 'Unknown', // author image
                image: getArticleImage(article) ? getArticleImage(article) : noImg,
                link: article.web_url,
                _createdAt: article.pub_date,
            })
        }
        if (source === 'guardian') {
            // setArticle(guardian.data.find((item) => item.webPublicationDate == _id))
            const article = guardian.data.find((item) => item.webPublicationDate == _id) 
            console.log(article);
            setArticle({
                title: article?.webTitle,
                description: article.webTitle +' '+ article.webTitle,
                author: article?.sectionName ? article.sectionName : 'Unknown', // author image
                image:  article.urlToImage ? article.urlToImage : noImg,
                // link: article.apiUrl,
                _createdAt: article.webPublicationDate,
            })
        }
        if (source === 'newsApi') {
            // setArticle(newsAPI.data.find((item) => item.publishedAt == _id))
            const article = newsAPI.data.find((item) => item.publishedAt == _id) 
            setArticle({
                title: article?.title,
                description: article.title +' '+ article.description,
                author: article?.author ? article.author : 'Unknown', // author image
                image: article.urlToImage ? article.urlToImage : noImg,
                link: article.apiUrl,
                _createdAt: article.publishedAt,
            })
        }
        // if(!(article && Object.keys(article).length > 0)) navigate('/')
    }, [])
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
            <img
                className="h-80 w-full object-cover "
                src={article.image}
                alt="Post Banner"
            />
            <article className="mx-auto max-w-3xl p-5">
            <h1 className="mt-10 mb-3 text-3xl">{article.title}</h1>
            <h2 className="mb-2 text-xl font-light text-gray-500">
            {article.description}
            </h2>
            <div className="flex items-center space-x-2">
            <img
                className="h-10 w-10 rounded-full"
                src={article.image}
                alt="author Image"
            />
            <p className="text-sm font-extralight">
                Blog post by{' '}
                <span className="text-green-600">{article.author}</span> -
                Published at {new Date(article._createdAt).toLocaleString('en-us')}
            </p>
            </div>
            <div className="mt-10">
            {/* <PortableText
                className=""
                dataset="production"
                projectId="1bt1t52i"
                content={post.body}
                serializers={{
                h1: (props: any) => {
                    <h1 className="my-5 text-2xl font-bold" {...props} />
                },
                h2: (props: any) => {
                    <h2 className="my-5 text-xl font-bold" {...props} />
                },
                li: ({ children }: any) => (
                    <li className="ml-4 list-disc"> {children}</li>
                ),
                link: ({ href, children }: any) => (
                    <a href={href} className="text-blue-500 hover:underline">
                    {children}
                    </a>
                ),
                }}
            /> */}
            </div>
        </article>
      </div>
    )
}

export default single