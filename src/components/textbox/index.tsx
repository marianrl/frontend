import React, {ChangeEvent, useState} from 'react';
import EyeIcon from "../icons/eyeicon";
import './style.css'

interface TextBoxProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
}

const TextBox: React.FC<TextBoxProps> = ({
    value,
    onChange,
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
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {type === 'password' && (
                <EyeIcon isVisible={isPasswordVisible} toggleVisibility={togglePasswordVisibility} />
            )}
        </div>
    );
};

export default TextBox;