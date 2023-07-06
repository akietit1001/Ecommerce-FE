import React from 'react';
import Layout from '../../../Layout/Layout';
import UserMenu from '../../../Layout/UserMenu/UserMenu';
import { useAuth } from '../../../context/auth';

const Dashboard = () => {
    const [auth] = useAuth()
    return (
    <Layout title={'Dashboard'}>
        <div className="container-fluid p-3 m-3">
            <div className='row'>
                <div className='col-md-3' style={{marginTop: '30px'}}>
                    <UserMenu />
                </div> 
                <div className='col-md-9' style={{marginTop: '30px'}}>
                    <div className="card w-75 p-3">
                        <h3>Name: {auth?.user?.name}</h3> 
                        <h3>Email: {auth?.user?.email} </h3> 
                        <h3>Contact: {auth?.user?.address} </h3> 
                    </div>
                </div> 
            </div> 
        </div> 
    </Layout>
    );
}

export default Dashboard;