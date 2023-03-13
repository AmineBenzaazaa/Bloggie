import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import api from '../services/api.service'
import { useTranslation } from "next-i18next";

const useScrollLoad = (url) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(false)
    
    const getAds = async () => {
        return axios({
            method: 'GET',
            url: url,
            headers: {
                "x-api-key": await api.generateApiKey()
            }
        }).then(res => {
            setItems(prevItems => {
                return [...prevItems, res?.data?.result]
            })
            setHasMore(res?.data?.result?.length > 0)
            setLoading(false)
        }).catch(err => {
            toast.error(t('err'))
            setError(true)
        })
    }

    useEffect(() => {
        setLoading(true)
        setError(false)
        getAds();
    }, [url])

    return { loading, hasMore, items, error }
}

export default useScrollLoad