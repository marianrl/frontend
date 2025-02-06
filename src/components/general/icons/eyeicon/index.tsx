import React, { FC } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface EyeIconProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

const EyeIcon: FC<EyeIconProps> = ({ isVisible, toggleVisibility }) => {
    return (
    <span onClick={toggleVisibility}>
      {isVisible ? <FaEye /> : <FaEyeSlash />}
    </span>
    );
};

export default EyeIcon;