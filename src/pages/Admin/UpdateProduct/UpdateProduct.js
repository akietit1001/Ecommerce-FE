import React, {useState, useEffect} from 'react';
import './UpdateProduct.css'
import axios from 'axios';
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
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categpries, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [photo, setPhoto] = useState('')
    const [id, setId] = useState('')

    // Get single product
    const getSingleProduct = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/v1/product/get-product/${params.slug}`
          );
          setName(data.product.name);
          setId(data.product._id);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setShipping(data.product.shipping);
          setCategory(data.product.category._id);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
      }, []);
      //get all category
      const getAllCategory = async () => {
        try {
          const data = await categoriesApi.getAllcategories("/api/v1/category/get-categories");
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something wwent wrong in getting catgeory");
        }
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);
    
      //update product function
      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("category", category);
          productData.append("quantity", quantity);
          photo && productData.append("photo", photo);
          const data = await productApi.updateProduct(`/api/v1/product/update-product/${id}`, productData);
          if (data?.success) {
              toast.success("Product Updated Successfully");
              navigate("/dashboard/admin/products");
            } else {
              toast.error(data?.message);
            }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      };
    
      //delete a product
      const handleDelete = async () => {
        try {
            let answer = window.confirm("Are You Sure want to delete this product ?");
            if (!answer) return;
            const data = await productApi.deleteProduct(`/api/v1/product/delete-product/${id}`);
            if(data?.success) {
                toast.success("Product DEleted Succfully");
                navigate("/dashboard/admin/products");
            }
        }  catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        };

    return (
        <Layout title={'Update Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Update Product</h1>
                        <div className='m-1 w-100'>
                            <SelectCustom 
                            bordered={false} 
                            placeholder="Select a category" 
                            size='large' 
                            showSearch
                            value={category}
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
                                {photo ? (
                                    <div className='text-center'>
                                        <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="product_photo" 
                                        height={'200px'} 
                                        className='img img-responsive'/>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img 
                                        src={`http://localhost:8080/api/v1/product/product-photo/${id}`} 
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
                                rows={'4'}
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
                                value={shipping ? 'Yes' : 'No'} 
                                placeholder='Write a shipping' 
                                className='form-control'
                                onChange={(value) => setShipping(value)}
                                width={'100%'}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </SelectCustom>
                            </div>
                            <div className="btn-action">
                                <div className="mb-3">
                                    <Button className='btn-create-product' onClick={handleUpdate}>UPDATE</Button>
                                </div>
                                <div className="mb-3">
                                    <Button className='btn-delete-product' onClick={handleDelete}>DELETE</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProduct;
