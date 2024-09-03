import React from 'react';
import './style.scss';
import Button from "../button";
import {useSession} from "../sessionprovider";
import {useNavigate} from "react-router-dom";

interface DetailsModelProps {
    estado: boolean;
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<DetailsModelProps> = ({ estado, cambiarEstadoModal }) => {

    const { logout } = useSession();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        logout(); // Cierra la sesión
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    const handleModalClose = () => {
        cambiarEstadoModal(false);
    };

    return (
        <>
            {estado &&
                <div>
                    <div className="Overlay">
                        <div className="ModalContainer">
                            <div className="ContenidoModal">
                                <h1 className="TituloModalCerrar">Atención</h1>
                                <p className="centrarTexto">
                                    ¿Desea cerrar sesion?
                                </p>
                                <ul>
                                    <div className="filaModal">
                                        <li>
                                            <Button
                                                type="button"
                                                label="Cerrar sesion"
                                                backgroundColor="#fc5151"
                                                hoverColor="#fc5151"
                                                hoverBorderColor="2px solid #fc5151"
                                                onClick={handleButtonClick}
                                            />
                                        </li>
                                        <li>
                                            <div className="Contenido">
                                                <Button
                                                    type="button"
                                                    label="Cancelar"
                                                    borderColor="2px solid #00004b"
                                                    color="#00004b"
                                                    backgroundColor="#ffffff"
                                                    hoverColor="#ffffff"
                                                    hoverBorderColor="2px solid #00004b"
                                                    hoverBackgroundColor="#00004b"
                                                    onClick={handleModalClose}
                                                />
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Modal;
