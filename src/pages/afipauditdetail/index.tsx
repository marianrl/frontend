import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import TableDetails from "../../components/tabledetails";
import {useNavigate, useParams} from "react-router-dom";
import{commonInputService} from "../../services/ams/commonInput";

const AfipAuditDetail: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([]);
    const { auditNumber } = useParams();
    let auditNumberValue: number = 0;

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    if (auditNumber != null) {
        auditNumberValue = parseInt(auditNumber, 10);
    }

    useEffect(() => {
        async function fetchData() {
            commonInputService.fetchCommonAuditById('afipInput',auditNumberValue)
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
                    <TableDetails data={data} />
                )}
            </header>
        </div>
    );
}


export default AfipAuditDetail;
