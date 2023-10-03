import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
const AuditAfip: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    const userData= [
        {
            name: "Mariano",
            position: "string",
            office: "string",
            age: 22,
            startDate: "string",
            salary: "string",
        },
        {
            name: "Mariano",
            position: "string",
            office: "string",
            age: 22,
            startDate: "string",
            salary: "string",
        }
        // Agrega más objetos de datos aquí si es necesario
    ];


    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
            </header>
        </div>
    );
}


export default AuditAfip;
