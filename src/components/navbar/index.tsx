import React, { useState } from 'react';
import './style.css';
import { BiLogOut } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { RiAdminFill } from 'react-icons/ri';
import { AiOutlineAudit, AiOutlineHome } from 'react-icons/ai';
import { BsFileBarGraph } from 'react-icons/bs';
import { TbReportSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Logo_izquierda.png';
import Nombre from '../../img/Logo_derecha.png';
import Buttongroup from '../general/buttongroup';
import Modal from '../modal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const handleAudit = () => {
    navigate('/audit');
  };
  const handleHome = () => {
    navigate('/dashboard');
  };
  const handleAuditAfip = () => {
    navigate('/auditafip');
  };

  const handleClick = () => {
    cambiarEstadoModal(true);
  };

  const handleAdminClick = () => {};

  return (
    <div>
      <Modal estado={estadoModal} cambiarEstadoModal={cambiarEstadoModal} />
      <nav className="main-menu">
        <ul>
          <li>
            <Buttongroup>
              <img src={Logo} className="nav-logo" alt="Logo" />
              <img src={Nombre} className="nav-nombre" alt="Nombre" />
            </Buttongroup>
          </li>
        </ul>
        <ul className="menu-block">
          <li>
            <a href="/dashboard" onClick={handleHome}>
              <i className="fa fa-2x">
                <AiOutlineHome />
              </i>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/search">
              <i className="fa fa-2x">
                <CiSearch />
              </i>
              <span className="nav-text">Busqueda</span>
            </a>
          </li>
          <li>
            <a href="/auditafip" onClick={handleAuditAfip}>
              <i className="fa fa-2x">
                <AiOutlineAudit />
              </i>
              <span className="nav-text">Auditorias AFIP</span>
            </a>
          </li>
          <li>
            <a href="/audit" onClick={handleAudit}>
              <i className="fa fa-2x">
                <BsFileBarGraph />
              </i>
              <span className="nav-text">Auditorias Internas</span>
            </a>
          </li>
          <li>
            <a href="/reports">
              <i className="fa fa-2x">
                <TbReportSearch />
              </i>
              <span className="nav-text">Reportes</span>
            </a>
          </li>
        </ul>
        <ul className="logout">
          <li>
            <a href="/admin" onClick={handleAdminClick}>
              <i className="fa fa-2x">
                <RiAdminFill />
              </i>
              <span className="nav-text">Admin</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleClick}>
              <i className="fa fa-2x">
                <BiLogOut />
              </i>
              <span className="nav-text">Cerrar sesión</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
