import './style.css';
import React, {useState} from 'react';
import EyeIcon from "../icons/eyeicon";

interface InputWrapperProps {
    htmlFor: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
}

const InputWrapper: React.FC<InputWrapperProps> = ({ htmlFor,
                                                     label,
                                                     type,
                                                     placeholder}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    return(

        <div className="input-wrapper">
            <input
                className="input"
                type={isPasswordVisible ? 'text' : type}
                placeholder={placeholder}
                id={htmlFor} required
            />
            {label && <label className="label">{label}</label>}
            {type === 'password' && (
                <EyeIcon isVisible={isPasswordVisible} toggleVisibility={togglePasswordVisibility} />
            )}
        </div>
);}
export default InputWrapper;