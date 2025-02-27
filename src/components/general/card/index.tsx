import React from 'react';
import './style.css';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="overviewCard">
      <div>{children}</div>
    </div>
  );
};
export default Card;
