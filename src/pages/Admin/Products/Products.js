import React, {useState, useEffect} from 'react';
import AdminMenu from '../../../Layout/AdminMenu/AdminMenu';
import Layout from '../../../Layout/Layout';
import { productApi } from '../../../http/Product';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])

    // Get all products
    const getAllProducts =  async () => {
        try {
            const res = await productApi.getAllproducts('/api/v1/product/get-products')
            setProducts(res?.products)
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong')
        }
    }

    // lifecycle method
    useEffect(()=> {
        getAllProducts()
    }, [])

    return (
        <Layout title={'Products'}>
        <div className='container-fluid m-3 p-3'>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Products List</h1>
                    <div className="d-flex flex-wrap">
                    {products?.map((product) => (
                    <Link 
                    to={`/dashboard/admin/products/${product.slug}`}  
                    key={product._id}
                    className='product-link'>
                        <div className='card m-2' style={{width: '20rem'}}>
                            <img 
                            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} 
                            className='card-img-top' 
                            alt={product.name} />
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {product.name.substring(0, 50)}...
                                </h5>
                                <p className='card-text'>
                                    {product.description.substring(0, 30)}...
                                </p>
                            </div>
                        </div>
                    </Link>
                    ))}
                    </div>
                </div>
            </div>
        </div>   
        </Layout>
    );
}

export default Products;
