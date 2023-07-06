import React, { useEffect, useState} from 'react';
import './CreateCategory.css'
import Layout from '../../../Layout/Layout';
import AdminMenu from '../../../Layout/AdminMenu/AdminMenu';
import { categoriesApi } from '../../../http/Category';
import Button from '../../../components/Button/Button'
import CategoryForm from '../../../components/Form/CategoryForm/CategoryForm';
import { toast } from 'react-hot-toast';
import { Modal} from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    
    const [name, setName] = useState('')

    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')


    // Handle form create category
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await categoriesApi.createCategory('/api/v1/category/create-category', {name})
        getAllcategories()
        if (res?.success) {
            setName('')
            toast.success(`${res?.category.name} is created`)
        } else {
            toast.error(res?.message)
        }
    }

    // Update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        const res = await categoriesApi.updateCategory(`/api/v1/category/update-category/${selected}`, {name: updatedName})
        if (res?.success) {
            toast.success(res?.message)
            setSelected(null)
            setUpdatedName('')
            setVisible(false)
            getAllcategories()
        } else {
            toast.error(res?.message)
        }
    }

    // Delete category
    const handleDelete = async (pId) => {
        const res = await categoriesApi.deleteCategory(`/api/v1/category/delete-category/${pId}`)
        if (res?.success) {
            toast.success(res?.message)
            getAllcategories()
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
        <Layout title={'Create Category'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row dashboard'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-100'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} TextButton={'Create'}/>
                        </div>
                        <div className='w-100'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((category)=> (
                                        <tr key={category._id}>
                                            <td>{category.name}</td>
                                            <td><Button className='edit' onClick={
                                                ()=>{
                                                    setVisible(true); 
                                                    setUpdatedName(category.name)
                                                    setSelected(category._id)
                                                    }
                                                }>Edit</Button>
                                            <Button className='delete' onClick={()=>{
                                                handleDelete(category._id)
                                            }} >Delete</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal 
                            title='Edit category' 
                            onCancel={()=>{setVisible(false)}} 
                            footer={null} 
                            open={visible}>
                                <CategoryForm 
                                value={updatedName} 
                                setValue={setUpdatedName} 
                                handleSubmit={handleUpdate}
                                TextButton={'Update'}
                                />
                            </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateCategory;
