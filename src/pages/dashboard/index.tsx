import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../components/general/header";
import SimpleLineGraph from "../../components/dashboard/simplelinegraph";
import Card from "../../components/general/card";
import './style.css';
import SimpleBarGraph from "../../components/dashboard/simplebargraph";
import SimplePieGraph from "../../components/dashboard/simplepiegraph";
import NotificationModal from "../../components/notificationmodal";
import Navbar from "../../components/navbar";
import CustomizedTable from '../../components/dashboard/dashboardtable';
import { auditService } from '../../services/ams/audit';
import { Audit } from '../../types/audit';
import { GoDotFill } from "react-icons/go";
import Spinner from '../../components/general/Spinner';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
    const [audits, setAudits] = useState<Audit[]>([]);  // Estado para los últimos 5 audits
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate("/login");
        }

        const fetchLast5Audits = async () => {
            try {
                setIsLoading(true);
                const response = await auditService.fetchAllAudit('audit');
                const allAudit = response.data;

                // Ordena por auditDate de forma descendente (más reciente primero)
                const sortedAudits = allAudit.sort((a: Audit, b: Audit) => {
                    return new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime();
                });

                // Devuelve los 5 más recientes
                setAudits(sortedAudits.slice(0, 5));
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener las auditorías:', error);
            }
        };

        fetchLast5Audits();
    }, [navigate]);

    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    const handleToggleNotificationModal = () => {
        setNotificationModalOpen(prev => !prev);
    };

    return (
        <div className="global-background-color">
            <header>
                <div>
                    <Header
                        name={name && lastName ? `${name} ${lastName}` : 'Guest'}
                        onToggleNotificationModal={handleToggleNotificationModal}
                    />
                </div>
            </header>
            <Navbar/>
            <NotificationModal className="notification-modal" isOpen={isNotificationModalOpen} onClose={() => setNotificationModalOpen(false)} />
            <h2 className="dashboard-title">Dashboard</h2>
            {isLoading ? ( <Spinner />
            ) : (<div className="grid-container">
                    <div className="grid-item-right">
                        <Card>
                            <h2>Auditorias Mensuales</h2>
                            <p>Cantidad de auditorias creadas en el ultimo año</p>
                            <SimpleLineGraph/>
                        </Card>
                    </div>
                    <div className="grid-item-left">
                        <Card>
                            <h2>Últimas Auditorías</h2>
                            <CustomizedTable rows={audits} />
                        </Card>
                    </div>
                    <div className="grid-item-right">
                        <div style={{display: "flex", gap: "30px", minHeight: "435px", width:"849px"}}>
                            <Card>
                                <div style={{width: "400px"}}>
                                    <h2>Auditorias internas</h2>
                                    <div style={{display: "flex", gap: "10px"}}>
                                        <GoDotFill color="#00C49F" size="20px"/> Auditadas
                                        <GoDotFill color="#0088FE" size="20px"/>Sin Auditar 
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div style={{width: "300px", height: "300px"}}>
                                            <SimplePieGraph type='comunes'/>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div style={{width: "400px"}}>
                                    <h2>Auditorias de AFIP</h2>
                                    <div style={{display: "flex", gap: "10px"}}>
                                        <GoDotFill color="#00C49F" size="20px"/> Auditadas
                                        <GoDotFill color="#0088FE" size="20px"/>Sin Auditar
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div style={{width: "300px", height: "300px"}}>
                                            <SimplePieGraph type='afip'/>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="grid-item-left">
                        <Card>
                            <div style={{width: "700px", height: "392px"}}>
                                <h2>Volumen anual de auditorias</h2>
                                <div style={{width: "660px", height: "330px"}}>
                                    <SimpleBarGraph/>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
