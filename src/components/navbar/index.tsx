import React from 'react';
import './style.css'
import {BiLogOut, BiMessageDetail} from "react-icons/bi";
import {AiOutlineAudit, AiOutlineHome} from "react-icons/ai";
import {BsFileBarGraph} from "react-icons/bs";
import {TbReportSearch} from "react-icons/tb";
import Logo from "../../img/Logo.png";

const Navbar: React.FC = () => {
    return (
        <div>
            <div className="area"></div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <img
                            src={Logo}
                            className="nav-logo"
                            alt="logo"
                        />
                    </li>
                </ul>
                <ul className="menu-block">
                    <li>
                        <a href="https://jbfarrow.com">
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
                        <a href="#">
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
                        <a href="/login">
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