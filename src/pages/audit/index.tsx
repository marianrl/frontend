import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Table from "../../components/table";
import {useNavigate} from "react-router-dom";
import {commonAuditService} from "../../services/ams/commonAudit";

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
            commonAuditService.fetchAllCommonAudit("commonAudit")
                .then((response) => {
                    const allCommonAudits = response.data;
                    setData(allCommonAudits);
                    console.log(allCommonAudits);
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
                    <Table data={data} />
                )}
            </header>
        </div>
    );
}


export default Audit;
