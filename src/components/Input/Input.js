import React from 'react';
import './Input.css'

const Input = ({title, value, required, onChange, type, placeholder, width}) => {
    return (
        <div className='input-wrapper' style={{width}}>
            <span className='label'>{title}</span>
            <div className='input-inner'>
            <input className='text-field'
                type={type}
                value={value} 
                required={required} 
                onChange={onChange}
                placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default Input;
