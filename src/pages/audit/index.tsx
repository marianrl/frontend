import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Table from "../../components/table";
import {useNavigate} from "react-router-dom";
import {auditService} from "../../services/ams/audit";

interface TipoAuditoria {
    id: number;
    auditType: string;
}

interface Auditado {
    id: number;
    audited: string;
}

interface AuditData {
    id: number;
    auditNumber: number;
    auditDate: string;
    idTipoAuditoria: TipoAuditoria;
    idAuditado: Auditado;
}

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

                    const filteredAudit = allAudit.filter(
                        (audit: AuditData) => audit.idTipoAuditoria.id === 1
                    );

                    setData(filteredAudit);
                    console.log(filteredAudit);
                })
                .catch(() => {
                    setData([]);
                    setErrorMessage('Error al procesar la solicitud');
                });
        }
        fetchData();
    }, []);

    const handleAuditClick = (auditNumber: number) => {
        navigate(`/commonAuditDetails/${auditNumber}`);
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
                    <Table data={data} onAuditClick={handleAuditClick} auditType="commonAuditDetails"/>
                )}
            </header>
        </div>
    );
}


export default Audit;
