import React from 'react';
import './Layout.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast'

const Layout = ({children, title, description, keywords, author}) => {
    return (
        <div className='wrapper-layout'>
            <Helmet>
                <meta charSet='utf-8'/>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main className='main-wrapper' style={{minHeight: '75vh', margin: '0 15px'}}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: 'Ecommerce app',
    description: 'mern stack project',
    keywords: 'mern,react,node,mongodb',
    author: 'kiet-nda',
};


export default Layout;
