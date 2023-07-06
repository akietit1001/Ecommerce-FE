import React, {useState, useEffect} from 'react';
import './Orders.css'
import Layout from '../../../Layout/Layout';
import UserMenu from './../../../Layout/UserMenu/UserMenu';
import { orderApi } from '../../../http/Order';
import { useAuth } from '../../../context/auth';
import { CaretDownOutlined } from '@ant-design/icons'
import moment from 'moment'

const Orders = () => {
    const [auth, setAuth] = useAuth()
    const [orders, setOrders] = useState([])

    const [show, setShow] = useState(true)
    const [indexOrder, setIndexOrder] = useState(0)

    const getOrders = async () => {
       try {
        const res = await orderApi.getOrders('/api/v1/auth/orders')
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
    return (
        <Layout title={'Orders'}>
        <div className="container-fluid p-3 m-3">
            <div className='row dashboard'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {
                        orders?.map((order, index) => {
                            return (
                                <div className='border shadow mb-3' key={order?._id}>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Orders</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{order?.status}</td>
                                                <td>{order?.buyer.name}</td>
                                                <td>{moment(order?.createAt).fromNow()}</td>
                                                <td>{order?.payment.success ? 'Success' : 'Failed'}</td>
                                                <td className='orders-detail'>
                                                    {order?.products?.length}
                                                    <CaretDownOutlined onClick={() => {
                                                        setIndexOrder(index)
                                                        setShow(!show)
                                                    }}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container" style={{display: show && indexOrder === index ? '' : 'none'}}>
                                    {order?.products?.map((c, index)=>(
                                        <div className='row mb-2 p-3 card flex-row' key={index}>
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

export default Orders;
