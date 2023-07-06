import React from 'react';
import { useSearch } from '../../context/search';
import searchApi from '../../http/Search';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate()
    const [values, setValues] = useSearch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await searchApi.searchProducts(`/api/v1/product/search/${values.keyword}`)
        setValues({...values, results: data})
        navigate('/search')
    }
    return (
        <div>
            <form className='d-flex' role='search' onSubmit={handleSubmit}>
                <input
                    className='form-control me-2'
                    type="text"
                    placeholder='Search' 
                    aria-label='Search'
                    value={values.keyword}
                    onChange={(e) => setValues({...values, keyword: e.target.value})}
                    />
                <button className='btn btn-outline-success' type='submit'>
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchInput;
