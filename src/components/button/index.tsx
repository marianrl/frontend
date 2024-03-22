import React, { useState } from 'react';
import './style.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    type: 'submit' | 'button';
    color?: string;
    backgroundColor?: string;
    hoverColor?: string;
    hoverBackgroundColor?: string;
    borderColor?: string;
    hoverBorderColor?: string;
    disabled?: boolean;
    style?: React.CSSProperties; // Propiedad 'style' para aplicar estilos adicionales
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
                                           disabled,
                                           style, // Recibir la propiedad 'style' en las props
                                           ...buttonProps
                                       }) => {
    const [hovered, setHovered] = useState(false);

    const buttonStyle = {
        color: hovered ? hoverColor : color,
        backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
        border: hovered ? hoverBorderColor : borderColor,
        ...style // Fusionar los estilos adicionales con los estilos base
    };

    return (
        <button className="button"
                type={type}
                style={buttonStyle}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick}
                disabled={disabled} // Usar la propiedad 'disabled' en el botón
                {...buttonProps}>
            {label}
        </button>
    );
};

export default Button;
