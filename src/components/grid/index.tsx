import React from 'react';
import './style.css'
import Card from "../card";
import Graphblock from "../graphblock";

const Grid: React.FC = () => {
    return (
        <div className="grid">
            <main className="main">
                <div className="main-overview">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <Graphblock/>
            </main>
        </div>
    );
};

export default Grid;