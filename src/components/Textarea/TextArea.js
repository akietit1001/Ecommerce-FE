import React from 'react';
import './TextArea.css'

const TextArea = ({title, value, required, onChange, type, placeholder, width, rows, cols}) => {
    return (
        <div className='textarea-wrapper' style={{width}}>
            <span className='label'>{title}</span>
            <div className='textarea-inner'>
            <textarea className='text-field'
                type={type}
                value={value} 
                required={required} 
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                />
            </div>
        </div>
    );
}

export default TextArea;
