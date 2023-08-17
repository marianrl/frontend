import React from 'react';
import './style.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, ...buttonProps }) => {
    return (
        <button className="button" onClick={onClick} {...buttonProps}>
            {label}
        </button>
    );
};

export default Button;
