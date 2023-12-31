import React from 'react';
import Layout from '../../../Layout/Layout';
import AdminMenu from '../../../Layout/AdminMenu/AdminMenu';
import { useAuth } from '../../../context/auth';
import './AdminDashboard.css'
const AdminDasboard = () => {
    const [auth] = useAuth()
    return ( 
    <Layout title={'Admin Dashboard'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row dashboard'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div> 
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                        <h3> Admin Name: {auth?.user?.name}</h3> 
                        <h3> Admin Email: {auth?.user?.email}</h3> 
                        <h3> Admin Contact: {auth?.user?.phone}</h3> 
                    </div> 
                </div> 
            </div> 
        </div> 
        </Layout>
    );
}

export default AdminDasboard;