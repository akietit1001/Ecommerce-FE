import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../Header/Header.css'
import { useAuth } from '../../context/auth';
import SearchInput from './../../components/SearchInput/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge} from 'antd'

const Header = () => {
    const [auth, setAuth] = useAuth()
    const [cart] = useCart()

    const categories = useCategory()

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
                <Link className='nav-brand' to='/'>
                    <img className='logo' src="/icons/logoai.svg" alt="logo" width={'30px'} height={'30px'}/>
                </Link>
                <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    <SearchInput />
                    <li className='nav-item'>
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                    </li>
                    <li className='nav-link dropdown-toggle'
                        data-bs-toggle='dropdown'>
                            Categories
                    </li>
                        <ul className='dropdown-menu'>
                            <li className='dropdown-item'>
                                <NavLink className='nav-link' to={'/categories'}>
                                    All Categories
                                </NavLink>
                            </li>
                            {categories?.map((c)=> (
                                    <li className='dropdown-item' key={c._id}>
                                        <NavLink className='nav-link' to={`/category/${c.slug}`}>
                                            {c.name}
                                        </NavLink>
                                    </li>
                            ))}
                        </ul>
                    {
                        !auth?.user ? (
                        <>
                            <li className='nav-item'>
                                    <NavLink className='nav-link' to='/login'>Login</NavLink>
                            </li>
                            <li className='nav-item'>
                                    <NavLink className='nav-link' to='/register'>Register</NavLink>
                            </li>
                        </>
                        ) : (
                        <>
                            <li className='nav-link dropdown-toggle'
                            href='#'
                            role='button'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'>
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
                                        Log Out
                                    </NavLink>
                                </li>
                            </ul>
                        </>)
                    }
                    <li className='nav-item'>
                            <Badge count={cart?.length} showZero>
                                <NavLink className='nav-link' to='/cart'>Cart</NavLink>
                            </Badge>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;