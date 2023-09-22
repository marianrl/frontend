import React from 'react';
import {useSession} from "../../components/sessionprovider";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import './style.css'
import Card from "../../components/grid";

const Home: React.FC = () => {

    const { logout, user } = useSession();
    const navigate = useNavigate();

    return (
        <div className="home">
            <header>
                <Navbar logout={logout} navigate={navigate} user={user} />
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
