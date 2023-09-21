import React from 'react';
import './style.css'
import {BiLogOut, BiMessageDetail} from "react-icons/bi";
import {AiOutlineAudit, AiOutlineHome} from "react-icons/ai";
import {BsFileBarGraph} from "react-icons/bs";
import {TbReportSearch} from "react-icons/tb";
import {useSession} from "../sessionprovider";
import {useNavigate} from "react-router-dom";
import Logo from "../../img/Logo_izquierda.png";
import Nombre from "../../img/Logo_derecha.png";
import Buttongroup from "../buttongroup";

const Navbar: React.FC = () => {

    const { logout } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Cierra la sesión
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };
    const handleAudit = () => {
        navigate('/audit');
    };
    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <Buttongroup>
                            <img
                                src={Logo}
                                className="nav-logo"
                                alt="Logo"
                            />
                            <img
                                src={Nombre}
                                className="nav-logo"
                                alt="Nombre"
                            />
                        </Buttongroup>
                    </li>
                </ul>
                <ul className="menu-block">
                    <li>
                        <a href="#" onClick={handleHome}>
                            <i className="fa fa-home fa-2x"><AiOutlineHome/></i>
                            <span className="nav-text">Inicio</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-globe fa-2x"><BiMessageDetail/></i>
                            <span className="nav-text">Mensajes</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-comments fa-2x"><AiOutlineAudit/></i>
                            <span className="nav-text">Auditorias AFIP</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="#" onClick={handleAudit}>
                            <i className="fa fa-camera-retro fa-2x"><BsFileBarGraph/></i>
                            <span className="nav-text">Auditorias Internas</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-film fa-2x"><TbReportSearch/></i>
                            <span className="nav-text">Reportes</span>
                        </a>
                    </li>
                </ul>
                <ul className="logout">
                    <li>
                        <a href="#" onClick={handleLogout}>
                            <i className="fa fa-power-off fa-2x"><BiLogOut/></i>
                            <span className="nav-text">Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;