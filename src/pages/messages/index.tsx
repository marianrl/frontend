import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Grid from "../../components/grid";
import NotificationModal from "../../components/notificationmodal";

const Messages: React.FC = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');
    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    const handleToggleNotificationModal = () => {
        setNotificationModalOpen(prev => !prev);
    };


    return (
        <div className="global-background-color">
            <header>
                <Navbar/>
                <div>
                    <Header
                        name={name && lastName ? `${name} ${lastName}` : 'Guest'}
                        onToggleNotificationModal={handleToggleNotificationModal}
                    />
                </div>
                <NotificationModal className="notification-modal" isOpen={isNotificationModalOpen} onClose={() => setNotificationModalOpen(false)} />
                <div className="prueba">
                    <Grid />
                </div>
            </header>
        </div>
    );
}


export default Messages;
