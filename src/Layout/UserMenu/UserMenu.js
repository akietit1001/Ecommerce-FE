import React from 'react';
import './UserMenu.css'
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className='list-group dashboard-menu'>
                    <h4>Dashboard</h4>
                    <NavLink to='/dashboard/user/profile' className='list-group-item list-group-action'>Profile</NavLink>
                    <NavLink to='/dashboard/user/orders' className='list-group-item list-group-action'>Orders</NavLink>
                </div>
       </div>
        </>
    );
}

export default UserMenu;
