import React from 'react';
import './Orders.css'
import Layout from '../../../Layout/Layout';
import UserMenu from './../../../Layout/UserMenu/UserMenu';

const Orders = () => {
    return (
        <Layout title={'Orders'}>
        <div className="container-fluid p-3 m-3">
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1>All Orders</h1>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Orders;
