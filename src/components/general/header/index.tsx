import React from 'react';
import './style.css';
import Badge from '@mui/material/Badge';
import { IoIosNotifications } from "react-icons/io";
import Button from "../button";

interface HeaderProps {
    name: string;
    onToggleNotificationModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           name,
                                           onToggleNotificationModal
                                       }) => {

    return (
        <div className="header">
            <h2 className="header-title">Bienvenido {name}</h2>
            <div className="profile-contein">
                <Button
                    type="button"
                    backgroundColor="#00004b"
                    hoverColor="#00004b"
                    hoverBorderColor="2px solid #00004b"
                    style={{ width: '50px' , height: '50px' , marginLeft: '20px' , borderRadius: '50%'}}
                    onClick={() => onToggleNotificationModal()}>
                    <Badge
                        badgeContent={7} color={"error"}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    >
                        <IoIosNotifications style={{height:'30px', width:'30px'}}/>
                    </Badge>
                </Button>
            </div>
        </div>
    );
};

export default Header;
