import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Grid from "../../components/grid";

const Messages: React.FC = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    return (
        <div className="global-background-color">
            <header>
                <Navbar/>
                <div>
                    <Header name= {name && lastName ? name + ' ' + lastName : 'Guest'}/>
                </div>
                <div className="prueba">
                    <Grid />
                </div>
            </header>
        </div>
    );
}


export default Messages;
