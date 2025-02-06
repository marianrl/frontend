import React, { ReactNode } from 'react';
import './style.css';

interface ButtonGroupProps {
    children: ReactNode;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
    return <div className="button-group">{children}</div>;
};

export default ButtonGroup;