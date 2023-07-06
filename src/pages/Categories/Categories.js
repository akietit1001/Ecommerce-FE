import React from 'react';
import './Categories.css'
import { Link } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import Layout from '../../Layout/Layout';

const Categories = () => {
    const categories = useCategory()

    return (
        <Layout title={'All Categories'}>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row container">
                <h1 className='text-center mb-2'>All Categories</h1>
                {categories?.map((c)=> (
                    <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                        <div className='card'><Link to={`/category/${c.slug}`} className='cat-btn text-center'>{c.name}</Link></div>
                    </div>
                ))}
                </div>
            </div>
        </Layout>
    );
}

export default Categories;
