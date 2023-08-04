import React,{useState, useEffect} from 'react';
import '../../styles/HomeStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { productApi } from '../../http/Product';
import { categoriesApi } from '../../http/Category';
import Button from './../../components/Button/Button';
import {Checkbox, Radio} from 'antd'
import { Prices } from '../../components/Prices/Prices';
import { useCart } from '../../context/cart';
import { toast } from 'react-hot-toast';
import Banner from '../../components/Banner/Banner';


const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [cart, setCart] = useCart()

    //get all category
    const getAllCategory = async () => {
        try {
          const data = await categoriesApi.getAllcategories("/api/v1/category/get-categories");
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getAllCategory();
        getTotal()
    }, []);

    // Get products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const res = await productApi.getAllproducts(`/api/v1/product/product-list/${page}`)
            if (res?.success) {
                setLoading(false)
                setProducts(res.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    // Get total count
    const getTotal = async () => {
        const data = await productApi.getTotal('/api/v1/product/product-count')
        if (data.success) {
            setTotal(data?.total)
        }
    }


    useEffect(()=>{
        if (!checked.length || !radio.length) {
            getAllProducts()
        }
    }, [checked.length, radio.length])

    useEffect(()=> {
        if(checked.length || radio.length) {
            filterProducts()
        }
    }, [checked, radio])


    useEffect(()=> {
        if(page === 1) return;
        loadMore()
    }, [page])
    // Load more products
    const loadMore = async () => {
        setLoading(true)
        const data = await productApi.getLoadMore(`/api/v1/product/product-list/${page}`)
        if(data.success) {
            setLoading(false)
            setProducts([...products, ...data?.products])
        }
    }
    
    // Filter categories
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    }

    // Get products after filtering
    const filterProducts = async () => {
        try {
            const res = await productApi.getFilterProducts('/api/v1/product/product-filters', {checked, radio})
            if (res?.success) {
                setProducts(res?.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={'All products - Best offers'}>
            {/* banner image */}
            {/* <Banner /> */}
            {/* banner image */}
            <div className='container-fluid m-3 p-3 home-page'>
                <div className="row mt-3" style={{width: '100%'}}>
                    <div className="col-md-3 filters">
                        <h4 className='text-center mb-2 pb-2'>Filter By Category</h4>
                        <div className="d-flex flex-column">
                        {categories?.map((category)=> (
                            <Checkbox key={category._id} onChange={(e)=> handleFilter(e.target.checked, category._id)}>
                                {category.name}
                            </Checkbox>
                        ))}
                        </div>
                        {/* {Price filter} */}
                        <h4 className='text-center mb-2 pb-2'>Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                                {Prices?.map((price)=> (
                                    <div key={price._id}>
                                        <Radio value={price.array}>{price.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <Button 
                        className={'btn-reset-filter mt-3'} 
                        width={'100%'} 
                        onClick={()=>window.location.reload()}
                        >Reset filter</Button>
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All products</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map(product => (
                               <div className="card m-2" style={{width: '20rem'}} key={product._id} >
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} onClick={() => navigate(`/product/${product.slug}`)}
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
                                            <Button 
                                            className='btn-add-to-cart btn-dark ms-1'
                                            onClick={()=> {
                                                toast.success('Item added to cart')
                                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                setCart([...cart, product])}}>ADD TO CART</Button>
                                        </div>
                                    </div>
                               </div>

                            ))}
                        </div>
                        <div className='m-2 p-3 text-center'>
                            {products && products.length < total && (
                                <Button className={'loadmore'} onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1)
                                }}>
                                    {loading ? "LOADING..." : 'VIEW MORE'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
