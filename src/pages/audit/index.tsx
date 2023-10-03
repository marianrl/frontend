import React, {useEffect} from 'react';
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Table from "../../components/table";
import {useNavigate} from "react-router-dom";
const Audit: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    const userData = [
        {
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },
        {
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },
        {
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },{
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },{
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },{
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },{
            name: "Michael Jones",
            email: "michael@gmail.com",
            status: "active",
        },

        // Agrega más objetos de datos aquí si es necesario
    ];


    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
                <Table data={userData}/>
            </header>
        </div>
    );
}


export default Audit;
