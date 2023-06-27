import React from 'react';
import '../Footer/Footer.css'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='wrapper-footer bg-dark text-light p-3'>
            <h4 className='text-center'>All Right Reserved &copy; Techinfoyt</h4>
            <p className="text-center mt-3">
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
                <NavLink to='/policy'>Policy</NavLink>
            </p>
        </div>
    );
}

export default Footer;
