import React, {useState, useEffect} from 'react';
import './CreateProduct.css'
import Layout from '../../../Layout/Layout';
import AdminMenu from '../../../Layout/AdminMenu/AdminMenu';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import SelectCustom from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import { categoriesApi } from './../../../http/Category';
import { productApi } from './../../../http/Product';
import TextArea from '../../../components/Textarea/TextArea';
import Button from './../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate()
    const [categpries, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [photo, setPhoto] = useState('')


    // Handle form create product
    const handleCreate = async (e) => {
        e.preventDefault()
        const productData = new FormData()
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        productData.append("photo", photo)
        productData.append("category", category)
        const res = await productApi.createProduct('/api/v1/product/create-product', productData)
        getAllcategories()
        if (res?.success) {
            setName('')
            toast.success(`Product is created`)
            navigate('/dashboard/admin/products')
        } else {
            toast.error(res?.message)
        }
    }

    // Get all categories
    const getAllcategories = async () => {
        const res = await categoriesApi.getAllcategories('/api/v1/category/get-categories')
        if (res?.success) {
            setCategories(res?.category)
        }
    }

    useEffect(()=>{
        getAllcategories()
    }, [])

    return (
        <Layout title={'Create Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Create Product</h1>
                        <div className='m-1 w-100'>
                            <SelectCustom 
                            bordered={false} 
                            placeholder="Select a category" 
                            size='large' 
                            showSearch 
                            onChange={(value) => {setCategory(value)}}>
                            {categpries?.map((category)=> (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                            </SelectCustom>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary'>
                                    {photo ? photo.name : 'Upload Photo'}
                                    <input 
                                    type="file" 
                                    name='photo' 
                                    accept='image/*' 
                                    onChange={(e)=>setPhoto(e.target.files[0])} 
                                    hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="product_photo" 
                                        height={'200px'} 
                                        className='img img-responsive'/>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <Input
                                title={'Name'}
                                type="text" 
                                value={name} 
                                placeholder='Write a name' 
                                className='form-control'
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <TextArea 
                                title={'Descriptions'}
                                type="text" 
                                value={description} 
                                placeholder='Write a description' 
                                className='form-control'
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                title={'Price'}
                                type="text" 
                                value={price} 
                                placeholder='Write a price' 
                                className='form-control'
                                onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                title={'Quantity'}
                                type="text" 
                                value={quantity} 
                                placeholder='Write a quantity' 
                                className='form-control'
                                onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <SelectCustom 
                                label={'Shipping'}
                                type="text" 
                                value={shipping} 
                                placeholder='Write a shipping' 
                                className='form-control'
                                onChange={(value) => setShipping(value)}
                                width={'100%'}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </SelectCustom>
                            </div>
                            <div className="mb-3">
                                <Button className='btn-create-product' onClick={handleCreate}>CREATE</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateProduct;
