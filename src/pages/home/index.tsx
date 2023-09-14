import React from 'react';
import {useSession} from "../../components/sessionprovider";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";


const Home: React.FC = () => {

    const { logout } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Cierra la sesión
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    return (
        <header className="App-header">
            <Navbar/>
        </header>
    );
}


export default Home;
