import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const single = () => {
    const newTimes = useSelector(state => state.nyTimes)
    const guardian = useSelector(state => state.guardian)
    const newsAPI = useSelector(state => state.newsApi)
    const [article, setArticle] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const source = id.split('_')[0]
        const _id = id.split('_')[1]
        if (source === 'nyTimes') {
            setArticle(newTimes.data.find((item) => item.pub_date == _id))
        }
        if (source === 'guardian') {
            setArticle(guardian.data.find((item) => item.webPublicationDate == _id))
        }
        if (source === 'newsApi') {
            setArticle(newsAPI.data.find((item) => item.publishedAt == _id))
        }
    }, [])

    return (
        <div>
            {console.log(article)}
            <div></div>
        </div>
    )
}

export default single