import React, {useState} from 'react';
import './style.css'
import {BiLogOut, BiMessageDetail} from "react-icons/bi";
import {AiOutlineAudit, AiOutlineHome} from "react-icons/ai";
import {BsFileBarGraph} from "react-icons/bs";
import {TbReportSearch} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import Logo from "../../img/Logo_izquierda.png";
import Nombre from "../../img/Logo_derecha.png";
import Buttongroup from "../buttongroup";
import Modal from "../modal";

const Navbar: React.FC = () => {

    const navigate = useNavigate();
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const handleAudit = () => {
        navigate('/audit');
    };
    const handleHome = () => {
        navigate('/home');
    };
    const handleAuditAfip = () => {
        navigate('/auditafip');
    };

    const handleClick = () => {
        cambiarEstadoModal(true); // Abre el modal
    };

    return (
        <div>
            <Modal
                estado={estadoModal}
                cambiarEstadoModal={cambiarEstadoModal}
            />
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
                                className="nav-nombre"
                                alt="Nombre"
                            />
                        </Buttongroup>
                    </li>
                </ul>
                <ul className="menu-block">
                    <li>
                        <a href="/home" onClick={handleHome}>
                            <i className="fa fa-home fa-2x"><AiOutlineHome/></i>
                            <span className="nav-text">Inicio</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="/messages">
                            <i className="fa fa-globe fa-2x"><BiMessageDetail/></i>
                            <span className="nav-text">Mensajes</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="/auditafip" onClick={handleAuditAfip}>
                            <i className="fa fa-comments fa-2x"><AiOutlineAudit/></i>
                            <span className="nav-text">Auditorias AFIP</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="/audit" onClick={handleAudit}>
                            <i className="fa fa-camera-retro fa-2x"><BsFileBarGraph/></i>
                            <span className="nav-text">Auditorias Internas</span>
                        </a>
                    </li>
                    <li>
                        <a href="/reports">
                            <i className="fa fa-film fa-2x"><TbReportSearch/></i>
                            <span className="nav-text">Reportes</span>
                        </a>
                    </li>
                </ul>
                <ul className="logout">
                    <li>
                        <a href="#" onClick={handleClick}>
                            <i className="fa fa-power-off fa-2x"><BiLogOut/></i>
                            <span className="nav-text">Cerrar sesión</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;