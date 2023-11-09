import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import Modal from "../../components/modal";

const Messages: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= "Mariano Home"/>
                </div>
                <div>
                    <Modal></Modal>
                </div>
            </header>
        </div>
    );
}


export default Messages;
