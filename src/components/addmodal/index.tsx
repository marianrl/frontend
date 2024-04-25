import React from 'react';
import './style.scss';
import Button from "../button";

interface AddModelProps {
    estado: boolean;
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal: React.FC<AddModelProps> = ({ estado, cambiarEstadoModal }) => {

    const handleButtonClick = () => {

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
                                <h1 className="TituloModalCerrar">Agregar nueva auditoria interna</h1>

                                <ul>
                                    <div className="filaModal">
                                        <li>
                                            <Button
                                                type="button"
                                                label="Crear"
                                                backgroundColor="#32a852"
                                                hoverColor="#32a852"
                                                hoverBorderColor="2px solid #32a852"
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

export default AddModal;
