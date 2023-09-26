import React from 'react';
import {useSession} from "../../components/sessionprovider";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
const AuditAfip: React.FC = () => {

    const { logout } = useSession();
    const navigate = useNavigate();

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
                <Navbar logout={logout} navigate={navigate} user={""}/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
            </header>
        </div>
    );
}


export default AuditAfip;
