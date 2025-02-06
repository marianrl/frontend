import React, {ChangeEvent, useState} from 'react';
import EyeIcon from "../general/icons/eyeicon";
import './style.css'

interface TextBoxProps {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
}

const TextBox: React.FC<TextBoxProps> = ({
    label,
    placeholder,
    type = 'text',
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="custom-textbox">
            {label && <label>{label}</label>}
            <input
                type={isPasswordVisible ? 'text' : type}
                placeholder={placeholder}
            />
            {type === 'password' && (
                <EyeIcon isVisible={isPasswordVisible} toggleVisibility={togglePasswordVisibility} />
            )}
        </div>
    );
};

export default TextBox;