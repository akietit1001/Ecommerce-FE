import React from 'react';
import './Users.css'
import Layout from '../../../Layout/Layout';
import AdminMenu from '../../../Layout/AdminMenu/AdminMenu';

const Users = () => {
    return (
        <Layout title={'All Users'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3' style={{marginTop: '30px'}}>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9' style={{marginTop: '30px'}}>
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Users;
