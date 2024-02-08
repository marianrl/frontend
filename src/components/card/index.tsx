import React from 'react';
import './style.css'
import { FcCheckmark } from "react-icons/fc";
import { FaExclamation } from "react-icons/fa";
import {IconContext} from "react-icons";

interface CardProps {
    title: string;
    text: string;
    showAlertIcon: boolean;
}

const Card: React.FC<CardProps> = ({ title, text, showAlertIcon }) => {
    return (
        <div className="overviewCard">
            <div className="overviewCard-icon">
                {showAlertIcon ?
                <IconContext.Provider value={{size: '45px', color: 'red'}}>
                    <FaExclamation/>
                </IconContext.Provider> :
                <IconContext.Provider value={{size: '45px'}}>
                    <FcCheckmark/>
                </IconContext.Provider>}
            </div>
            <div className="overviewCard-description">
                <h3 className="overviewCard-title text-light">
                    {title}
                </h3>
                <p className="overviewCard-subtitle">{text}</p>
            </div>
        </div>
    );
};
export default Card;