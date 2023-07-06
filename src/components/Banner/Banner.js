import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '530px',
  width: '100%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};

const Banner = () => {
    return (
        <Carousel autoplay={true} className='dashboard'>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://shop-t1-na.gg/cdn/shop/files/2023_spring_Line_Images-04_1800x.jpg?v=1680288414" alt="" height={'100%'}/>
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://shop-t1-na.gg/cdn/shop/files/2023-spring_products_1800x.gif?v=1682358120" alt="" height={'100%'}/>
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://shop-t1-na.gg/cdn/shop/files/2023-spring-jersey_web_1800x.gif?v=1680652684" alt="" height={'100%'}/>
                </h3>
            </div>
        </Carousel>
    );
}

export default Banner;
