import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../Header/Header.css'
import { useAuth } from '../../context/auth';

const Header = () => {
    const [auth, setAuth] = useAuth()

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        })
        localStorage.removeItem('auth')
    }
    return (
        <nav className='wrapper-nav'>
            <div className='inner-nav'>
                <Link className='nav-brand' to='/'>Brand</Link>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                            <NavLink className='nav-link' to='/category'>Category</NavLink>
                    </li>
                    {
                        !auth.user ? (<>
                        <li className='nav-item'>
                                <NavLink className='nav-link' to='/login'>Login</NavLink>
                        </li>
                        <li className='nav-item'>
                                <NavLink className='nav-link' to='/register'>Register</NavLink>
                        </li>
                        </>) : (<>
                            <li className='nav-link dropdown-toggle'
                            href='#'
                            role='button'
                            data-bs-toggle='dropdown'
                            aria-aria-expanded='false'>
                                {auth?.user?.name}
                            </li>
                            <ul className='dropdown-menu'>
                                <li className='dropdown-item'>
                                    <NavLink to={`dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className='nav-link'>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className='dropdown-item' onClick={handleLogout}>
                                    <NavLink className='nav-link' to='/login'>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </>)
                    }
                    <li className='nav-item'>
                            <NavLink className='nav-link' to='/cart'>Cart (0)</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;