import React from 'react';
import {useSession} from "../../components/sessionprovider";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Table from "../../components/table";
const Audit: React.FC = () => {

    const { logout } = useSession();
    const navigate = useNavigate();

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
                <Navbar logout={logout} navigate={navigate}/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
                <Table data={userData}/>
            </header>
        </div>
    );
}


export default Audit;
