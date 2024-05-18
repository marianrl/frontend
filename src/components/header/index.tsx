import React from 'react';
import './style.css'
import Profile from "../profile";

interface HeaderProps {
    name: string;
}
const Header: React.FC<HeaderProps> = ({
    name,
}) => {
    return (
        <div className="header">
            <h2 className="header-title">Bienvenido {name}</h2>
            <div className="profile-contein">
                <Profile name={name}/>
            </div>
        </div>


    );
};

export default Header;
