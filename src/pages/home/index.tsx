import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import './style.css'
import Grid from "../../components/grid";

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= {name && lastName ? name + ' ' + lastName : 'Guest'}/>
                </div>
                <div>
                    <Grid/>
                </div>
            </header>
        </div>
    );
}


export default Home;
