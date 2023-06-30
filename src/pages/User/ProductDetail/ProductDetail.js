import React, {useState, useEffect} from 'react';
import Layout from '../../../Layout/Layout';
import { productApi } from '../../../http/Product';
import { useParams } from 'react-router-dom';
import Button from './../../../components/Button/Button';
import relatedProductsApi from '../../../http/RelatedProducts';

const ProductDetail = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    // initalp details
    useEffect(()=>{
        if(params?.slug) getProducts()
    }, [params?.slug])

    // get products
    const getProducts = async () => {
        const data = await productApi.getSingleProduct(`api/v1/product/get-product/${params.slug}`)
        setProduct(data?.product)
        await getRelatedProducts(data?.product?._id, data?.product.category?._id)
    }

    // Get related products
    const getRelatedProducts = async (pid, cid) => {
        const data = await relatedProductsApi(pid, cid)
        setRelatedProducts(data?.products)
    }

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className="row container mt-2">
                    <div className="col-md-6">
                    <img 
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} 
                        className='card-img-top' 
                        alt={product?.name} 
                        height={'350px'}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className='text-center'>Product Details</h1>
                        <h6>Name: {product?.name}</h6>
                        <h6>Description: {product.description}</h6>
                        <h6>Price: {product.price}</h6>
                        <h6>Category: {product?.category?.name}</h6>
                        <Button className={'mt-2'}>ADD TO CART</Button>
                    </div>
                </div>
                <hr />
                <div className="row container">
                    <h6>Similar Products</h6>
                    {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
                    <div className="d-flex flex-wrap">
                            {relatedProducts?.map(product => (
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

export default ProductDetail;
