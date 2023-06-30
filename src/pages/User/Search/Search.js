import React from 'react';
import Layout from '../../../Layout/Layout';
import { useSearch } from '../../../context/search';
import Button from '../../../components/Button/Button';

const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>
                        Search Results
                    </h1>
                    <h6>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results?.length}`}</h6>
                    <div className="d-flex flex-wrap">
                            {values?.results.map(product => (
                               <div className="card m-2" style={{width: '20rem'}}>
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                                    className='card-img-top'
                                    alt={product.name} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            {product.name.substring(0, 50)}...
                                        </h5>
                                        <p className='card-text'>
                                            {product.description.substring(0, 30)}...
                                        </p>
                                        <p className='card-text'>
                                           ${product.price}
                                        </p>
                                        <div className='btn-group'>
                                            <Button className='btn-detail'>More Details</Button>
                                            <Button className='btn-add-to-cart ms-1'>ADD TO CART</Button>
                                        </div>
                                    </div>
                               </div>

                            ))}
                        </div>
                </div>
            </div>
        </Layout>
    );
}

export default Search;
