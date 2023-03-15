import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

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
                title: article?.abstract,
            })
        }
        if (source === 'guardian') {
            setArticle(guardian.data.find((item) => item.webPublicationDate == _id))
        }
        if (source === 'newsApi') {
            setArticle(newsAPI.data.find((item) => item.publishedAt == _id))
        }
        // if(!(article && Object.keys(article).length > 0)) navigate('/')
    }, [])

    return (
        <div>
            <div>Title {article.title}</div>
        </div>
    )
}

export default single