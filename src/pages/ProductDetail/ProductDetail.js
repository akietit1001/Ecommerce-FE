import React, {useState, useEffect} from 'react';
import '../../styles/ProductDetailStyle.css'
import Layout from '../../Layout/Layout';
import { productApi } from '../../http/Product';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import relatedProductsApi from '../../http/RelatedProducts';
import { useCart } from '../../context/cart';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [cart, setCart] = useCart()
    const navigate = useNavigate()

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
                <div className="row container product-details">
                    <div className="col-md-6">
                    <img 
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} 
                        className='card-img-top' 
                        alt={product?.name} 
                        />
                    </div>
                    <div className="col-md-6 product-details-info">
                        <h1 className='text-center'>{product?.name}</h1>
                        {/* <h6>Name: {product?.name}</h6> */}
                        <h6>Description: {product.description}</h6>
                        <h6>
                            {`Price : ${product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            })}`}
                        </h6>
                        <h6>Category: {product?.category?.name}</h6>
                        <Button 
                        className={'mt-2'} 
                        onClick={()=> {
                            toast.success('Item added to cart')
                            localStorage.setItem('cart', JSON.stringify([...cart, product]))
                            setCart([...cart, product])}}>ADD TO CART</Button>
                    </div>
                </div>
                <hr />
                <div className="row container similar-products">
                    <h6>Similar Products</h6>
                    {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
                    <div className="d-flex flex-wrap">
                            {relatedProducts?.map(product => (
                               <div className="card m-2" style={{width: '20rem'}} key={product._id}>
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                                    onClick={() => navigate(`/product/${product.slug}`)}
                                    className='card-img-top'
                                    alt={product.name} />
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
                                        <div className='btn-group card-name-price'>
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

export default ProductDetail;
