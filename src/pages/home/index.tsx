import React from 'react';
import {useSession} from "../../components/sessionprovider";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import './style.css'
import Card from "../../components/grid";



const Home: React.FC = () => {

    const { logout } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Cierra la sesión
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
                <div>
                    <Card/>
                </div>
            </header>
        </div>
    );
}


export default Home;
