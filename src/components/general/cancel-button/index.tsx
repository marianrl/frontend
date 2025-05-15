import React from 'react';
import './style.css';

interface CancelButtonProps {
  label: string;
  onClick: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  label,
  onClick,
  ...buttonProps
}) => {
  return (
    <button className="cancel-button" onClick={onClick} {...buttonProps}>
      {label}
    </button>
  );
};

export default CancelButton;
