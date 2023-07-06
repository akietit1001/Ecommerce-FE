import React from 'react';
import Layout from '../../Layout/Layout';
import { useSearch } from '../../context/search';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import { toast } from 'react-hot-toast';
import '../../styles/HomeStyle.css'

const Search = () => {
    const [values, setValues] = useSearch()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    return (
        <Layout title={'Search results'}>
            <div className='container dashboard home-page'>
                <div className='text-center'>
                    <h1>
                        {`Search Results for '${values?.keyword}'`}
                    </h1>
                    <h6>{values?.results?.length < 1 ? 'No Products Found' : `Found ${values?.results?.length}`}</h6>
                    <div className="d-flex flex-wrap m-auto">
                            {values?.results?.map(product => (
                               <div className="card m-2" style={{width: '20rem'}} key={product._id}>
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                                    className='card-img-top'
                                    alt={product.name} 
                                    onClick={() => navigate(`/product/${product.slug}`)}
                                    />
                                    <div className='card-body d-flex flex-column'>
                                    <div className='card-name-price'>
                                        <h5 className='card-title'>
                                            {product.name.substring(0, 50)}...
                                        </h5>
                                        <p className='card-title card-price'>
                                            {product.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                        </p>
                                    </div>
                                        <p className='card-text'>
                                            {product.description.substring(0, 30)}...
                                        </p>
                                        <div className='card-name-price'>
                                            <Button className='btn-detail' onClick={() => navigate(`/product/${product.slug}`)}>More Details</Button>
                                            <Button className='btn-add-to-cart ms-1' onClick={()=> {
                                                toast.success('Item added to cart')
                                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                setCart([...cart, product])}}>ADD TO CART</Button>
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
