import React from 'react';
import './Select.css'
import { Select } from 'antd';

const SelectCustom = ({label, children, bordered, showSearch, placeholder, size, className, onChange, width, value }) => {
    return (
        <>
            <label className='label'>
                {label}
            </label>
            <Select className={className + ' ' + 'form-select mb-3 select-wrapper'}
                bordered={bordered}
                showSearch={showSearch}
                placeholder={placeholder}
                size={size}
                style={{width}}
                onChange={onChange}
                value={value}>
                    {children}
            </Select>
        </>
    );
}

export default SelectCustom;
