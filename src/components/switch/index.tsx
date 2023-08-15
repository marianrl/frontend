import React, { useState } from 'react';
import './style.css';

interface SwitchProps {
    label: string;
}

const Switch: React.FC<SwitchProps> = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="switch-container">
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
                <span className="slider"></span>
            </label>
            <p>{label} {isChecked ? 'Recordar usuario' : 'No recordar usuario'}</p>
        </div>
    );
};

export default Switch;