import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import SimpleLineGraph from "../../components/simplelinegraph";
import Card from "../../components/card";
import './style.css';
import SimpleBarGraph from "../../components/simplebargraph";
import DoublePieGraph from "../../components/doublepiegraph";
import SimplePieGraph from "../../components/simplepiegraph";
import NotificationModal from "../../components/notificationmodal";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate("/login");
        }
    }, [navigate]);

    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    const handleToggleNotificationModal = () => {
        setNotificationModalOpen(prev => !prev);
    };

    return (
        <div className="dashboard-background-color">
            <header>
                <Navbar/>
                <div>
                    <Header
                        name={name && lastName ? `${name} ${lastName}` : 'Guest'}
                        onToggleNotificationModal={handleToggleNotificationModal}
                    />
                </div>
            </header>
            <NotificationModal className="notification-modal" isOpen={isNotificationModalOpen} onClose={() => setNotificationModalOpen(false)} />
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="grid-container">
                <div className="grid-item-right">
                    <Card>
                        <h2>Titulo</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <SimpleLineGraph width={826} height={250}/>
                    </Card>
                </div>
                <div className="grid-item-left">
                    <Card>
                        <h2>Titulo</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <SimpleLineGraph width={700} height={250}/>
                    </Card>
                </div>
                <div className="grid-item-right">
                    <div style={{display: "flex", gap: "30px"}}>
                        <Card>
                            <h2>Titulo</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <SimplePieGraph width={300} height={300} radius={120}/>
                        </Card>
                        <Card>
                            <h2>Titulo</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <DoublePieGraph width={300} height={300} outerRadius={100} innerRadius={80}/>
                        </Card>
                    </div>
                </div>
                <div className="grid-item-left">
                    <Card>
                        <SimpleBarGraph width={700} height={410}/>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
