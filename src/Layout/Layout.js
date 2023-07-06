import React from 'react';
import './Layout.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast'
import Button from '../components/Button/Button';

const Layout = ({children, title, description, keywords, author}) => {
    
    // scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Tùy chọn "smooth" sẽ tạo hiệu ứng cuộn mượt
        });
    }

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
            <main className='main-wrapper' style={{minHeight: '81vh', margin: '0 15px', marginTop: '20px'}}>
                <Toaster position="top-center" reverseOrder={false}/>
                {children}
            </main>
            
            <Button className="scrollToTopButton" onClick={scrollToTop}>&#8593;</Button>
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
