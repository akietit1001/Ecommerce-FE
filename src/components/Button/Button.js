import React from 'react';
import './Button.css'

const Button = ({className, children, disabled = false, onClick, width}) => {
    return (
        <button className={`btn ${className}`} disabled={disabled} onClick={onClick} style={{width}}>
            {children}
        </button>
    );
}

export default Button;
