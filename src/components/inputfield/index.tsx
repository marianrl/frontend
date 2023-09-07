import React from 'react';
import './style.css'

interface InputWrapperProps {
    htmlFor: string;
    label: string;
    type: string;
}
const InputWrapper: React.FC<InputWrapperProps> = ({ htmlFor, label, type }) => {
    return(

        <div className="input-wrapper">
            <input className="input" type={type} id={htmlFor} required />
            <label className="label" htmlFor={htmlFor}>{label}</label>
        </div>
);}
export default InputWrapper;