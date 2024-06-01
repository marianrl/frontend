import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import SimpleLineGraph from "../../components/simplelinegraph";
import Card from "../../components/card";
import './style.css';
import SimpleBarGraph from "../../components/simplebargraph";
import DoublePieGraph from "../../components/doublepiegraph";
import SimplePieGraph from "../../components/simplepiegraph";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [navigate]);

    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    return (
        <div className="dashboard-background-color">
            <header>
                <Navbar/>
                <div>
                    <Header name={name && lastName ? name + ' ' + lastName : 'Guest'}/>
                </div>
            </header>
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="grid-container">
                <div className="grid-item">
                    <Card>
                        <SimpleLineGraph width={800} height={250}/>
                    </Card>
                </div>
                <div className="grid-item">
                    <Card>
                        <SimpleLineGraph width={500} height={250}/>
                    </Card>
                </div>
                <div className="grid-item">
                    <div style={{display: "flex", gap: "30px"}}>
                        <Card>
                            <SimplePieGraph width={300} height={300} radius={120}/>
                        </Card>
                        <Card>
                            <DoublePieGraph width={300} height={300} outerRadius={100} innerRadius={80}/>
                        </Card>
                    </div>
                </div>
                <div className="grid-item">
                    <Card>
                        <SimpleBarGraph width={700} height={400}/>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
