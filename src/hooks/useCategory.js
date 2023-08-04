import { useState, useEffect} from 'react'
import axiosClient from './../http/AxiosClient';


export default function useCategory() {
    const [categories, setCategories] = useState([])

    // Get categories
    const getAllCategories = async () => {
        const data = await axiosClient.get('/api/v1/category/get-categories')
        setCategories(data?.data?.category)
    }

    useEffect(()=> {
        getAllCategories()
    }, [])

    return categories;
}