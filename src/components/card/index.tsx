import React from 'react';
import './style.css'

const Card: React.FC = () => {
    return (
        <div className="overviewCard">
            <div className="overviewCard-icon overviewCard-icon--document">
                <i></i>
            </div>
            <div className="overviewCard-description">
                <h3 className="overviewCard-title text-light">
                    New <strong>Document</strong>
                </h3>
                <p className="overviewCard-subtitle">Europe Trip</p>
            </div>
        </div>
    );
};
    export default Card;