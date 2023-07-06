import React, {useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import Layout from '../../../Layout/Layout';
import AdminMenu from '../../../Layout/AdminMenu/AdminMenu';
import { orderApi } from '../../../http/Order';
import { useAuth } from '../../../context/auth';
import moment from 'moment';
import { Select } from 'antd';

const { Option } = Select

const AdminOrders = () => {
    const [status, setStatus] = useState(['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancel'])
    const [changeStatus, setChangeStatus] = useState('')
    const [auth, setAuth] = useAuth()
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
       try {
        const res = await orderApi.getAllOrders('/api/v1/auth/all-orders')
        setOrders(res)
       } catch (error) {
        console.log(error)
       }
    }

    useEffect(()=>{
        if (auth?.token) {
            getOrders()
        }
    },[auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const res = await orderApi.updateStatus(`/api/v1/auth/order-status/${orderId}`, {status: value})
            getOrders()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={'Admin Orders'}>
            <div className='container-fluid m-3 p-3'>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Orders</h1>
                    {
                        orders?.map((order, index) => {
                            return (
                                <div className='border shadow' key={order?._id}>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Orders</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>
                                                    <Select 
                                                    bordered={false} 
                                                    onChange={(value)=> handleChange(order?._id, value)} 
                                                    defaultValue={order?.status}>
                                                        {status?.map((s, index)=>(
                                                            <Option key={index} value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td>{moment(order?.createAt).fromNow()}</td>
                                                <td>{order?.payment.success ? 'Success' : 'Failed'}</td>
                                                <td>{order?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                    {order?.products?.map((c, index)=>(
                                        <div className='row mb-2 p-3 card flex-row' key={c._id}>
                                            <div className="col-md-4">
                                                <img src={`http://localhost:8080/api/v1/product/product-photo/${c._id}`}
                                                className='cart-img-top' 
                                                alt={c.name}
                                                width={'100px'}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{c.name}</p>
                                                <p>{c.description.substring(0,50)}...</p>
                                                <h4>Price: {c.price}</h4>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </div>
        </Layout>
    );
}

export default AdminOrders;
