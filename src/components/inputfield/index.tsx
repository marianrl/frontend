import './style.css';
import React, {useState} from 'react';

interface InputWrapperProps {
    htmlFor: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ htmlFor,
                                                     label,
                                                     type,
                                                     placeholder,
                                                     value,
                                                     onChange}) => {
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
                value={value}
                onChange={onChange}
            />
            {label && <label className="label">{label}</label>}
            {type === 'password' && (
                <div className="checkbox">
                    <input
                        type="checkbox"
                        checked={isPasswordVisible}
                        onChange={togglePasswordVisibility}
                    />
                    <label className="showPassword">
                        Mostrar contraseña
                    </label>
                </div>
            )}
        </div>
);}
export default InputWrapper;