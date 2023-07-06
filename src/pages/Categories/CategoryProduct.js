import React, {useState, useEffect} from 'react';
import '../../styles/CategoryProductStyle.css'
import Layout from '../../Layout/Layout';
import { productApi } from '../../http/Product';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/cart';
import { toast } from 'react-hot-toast';

const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [cart, setCart] = useCart()

    useEffect(()=> {
        if(params?.slug) getProductByCategory()
    }, [params?.slug])

    const getProductByCategory = async () => {
        const data = await productApi.getProductByCategory(`/api/v1/product/product-category/${params.slug}`)
        setProducts(data?.products)
        setCategory(data?.category)
    }
    return (
        <Layout>
            <div className="container mt-3 category">
                <h2 className='text-center' style={{marginTop: '30px'}}>
                    Category - {category?.name}
                </h2>
                <div className="text-center">{products?.length} results</div>
                <div className="row">
                    <div className="col-md-10 offset-1">
                            <h1 className='text-center mb-2'>All products</h1>
                            <div className="d-flex flex-wrap">
                                {products?.map(product => (
                                <div className="card m-2" style={{width: '20rem'}} key={product._id} onClick={() => navigate(`/product/${product.slug}`)}>
                                        <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
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
                                            <div className='card-name-price'>
                                                <Button className='btn-detail btn-info' onClick={() => navigate(`/product/${product.slug}`)}>More Details</Button>
                                                <Button className='btn-add-to-cart ms-1' onClick={()=> {
                                                toast.success('Item added to cart')
                                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                setCart([...cart, product])}}>ADD TO CART</Button>
                                            </div>
                                        </div>
                                </div>

                                ))}
                            </div>
                            {/* <div className='m-2 p-3'>
                                {products && products.length < total && (
                                    <Button className={'btn-warning'} onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1)
                                    }}>
                                        {loading ? "Loading..." : 'Loadmore'}
                                    </Button>
                                )}
                            </div> */}
                        </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryProduct;
