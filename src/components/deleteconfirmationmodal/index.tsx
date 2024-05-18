// ConfirmationModal.js
import React from 'react';
import './style.scss';
import Button from "../button";

interface DeleteConfirmationModelProps {
    estado: boolean;
    cambiarEstadoDeleteConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleModalClose: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteConfirmationButtonClick: () => void;
    auditType: string | null;
    auditDate: string | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModelProps> = ({
         estado,
         cambiarEstadoDeleteConfirmationModal,
         handleModalClose,
         handleDeleteConfirmationButtonClick,
         auditType,
         auditDate}) => {

    const handleDeleteConfirmationModalClose = () => {
        cambiarEstadoDeleteConfirmationModal(false);
    };

    const handleDetailsModalClose = () => {
        handleModalClose(false);
    }

    return (
        <>
            {estado &&
                <div className="Overlay">
                    <div className="ConfirmationModalContainer">
                        <div className="ConfirmationContenidoModal">
                            <h1 className="ConfirmationTituloModalCerrar">Se eliminara la siguiente auditoria: </h1>
                            <p className="Centrar">
                                {auditType} - {auditDate}
                            </p>
                            <p className="Disclosure">
                                <strong>(Tenga en cuenta que esta accion no puede ser revertida)</strong>
                            </p>
                            <ul>
                                <div className="filaModal">
                                    <li>
                                        <Button
                                            type="button"
                                            label="Eliminar"
                                            backgroundColor="#fc5151"
                                            hoverColor="#fc5151"
                                            hoverBorderColor="2px solid #fc5151"
                                            onClick={() => {
                                                handleDeleteConfirmationButtonClick();
                                                handleDeleteConfirmationModalClose();
                                                handleDetailsModalClose();
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <div>
                                            <Button
                                                type="button"
                                                label="Cancelar"
                                                borderColor="2px solid #00004b"
                                                color="#00004b"
                                                backgroundColor="#ffffff"
                                                hoverColor="#ffffff"
                                                hoverBorderColor="2px solid #00004b"
                                                hoverBackgroundColor="#00004b"
                                                onClick={handleDeleteConfirmationModalClose}
                                            />
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default DeleteConfirmationModal;
