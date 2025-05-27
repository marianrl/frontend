import React from 'react';
import './style.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`overviewCard ${className || ''}`} {...props}>
      <div>{children}</div>
    </div>
  );
};
export default Card;
