import React, {useState} from 'react';
import './style.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    type: 'submit' | 'button';
    color?: string;
    backgroundColor?:string;
    hoverColor?: string;
    hoverBackgroundColor?: string;
    borderColor?:string;
    hoverBorderColor?: string;

}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           type = 'button',
                                           color,
                                           backgroundColor,
                                           hoverColor,
                                           hoverBackgroundColor,
                                           borderColor,
                                           hoverBorderColor,
                                           ...buttonProps
}) => {
    const [hovered, setHovered] = useState(false);

    const buttonStyle = {
        color: hovered ? hoverColor : color,
        backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
        border: hovered ? hoverBorderColor : borderColor,
    };

    return (
        <button className="button"
                type={type}
                style={buttonStyle}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick} {...buttonProps}>
            {label}
        </button>
    );
};

export default Button;
