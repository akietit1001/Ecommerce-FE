import React from 'react';
import './Profile.css'
import Layout from '../../../Layout/Layout';
import UserMenu from '../../../Layout/UserMenu/UserMenu';

const Profile = () => {
    return (
        <Layout title={'Profile'}>
            <div className="container-fluid p-3 m-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Profile</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
