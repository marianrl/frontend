import React from 'react';
import './style.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    type: 'submit' | 'button';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', ...buttonProps }) => {
    return (
        <button className="button" type={type} onClick={onClick} {...buttonProps}>
            {label}
        </button>
    );
};

export default Button;
