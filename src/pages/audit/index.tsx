import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Table from "../../components/table";
import {useNavigate} from "react-router-dom";
import {auditService} from "../../services/ams/audit";

const Audit: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    useEffect(() => {
        async function fetchData() {
            auditService.fetchAllAudit("audit")
                .then((response) => {
                    const allAudit = response.data;
                    setData(allAudit);
                    console.log(allAudit);
                })
                .catch(() => {
                    setData([]);
                    setErrorMessage('Error al procesar la solicitud');
                });
        }
        fetchData();
    }, []);

    const handleAuditClick = (auditNumber: number) => {
        navigate(`/auditDetails/${auditNumber}`);
    };

    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
                {errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <Table data={data} onAuditClick={handleAuditClick}/>
                )}
            </header>
        </div>
    );
}


export default Audit;
