import React from 'react';
import Buttongroup from "../../components/buttongroup";
import Button from "../../components/button";
import {useSession} from "../../components/sessionprovider";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

    const { logout } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Cierra la sesión
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    return (
        <header className="App-header">
            <div>
                <Buttongroup>
                    <Button onClick={handleLogout} type="button" label="Cerrar Sesion"/>
                </Buttongroup>
            </div>
        </header>
    );
}

export default Home;
