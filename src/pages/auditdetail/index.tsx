import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import TableAfip from "../../components/tableafip";
import {useNavigate, useParams} from "react-router-dom";
import{commonInputService} from "../../services/ams/commonInput";

const AuditDetail: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([]);
    const { auditNumber } = useParams<{ auditNumber: string }>();
    if (auditNumber != null) {
        const auditNumberValue = parseInt(auditNumber, 10);
    }

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    useEffect(() => {
        async function fetchData() {
            commonInputService.fetchCommonAuditById('commonInput',2)
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
                    <TableAfip data={data} />
                )}
            </header>
        </div>
    );
}


export default AuditDetail;
