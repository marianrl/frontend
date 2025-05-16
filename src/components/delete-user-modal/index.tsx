import React from 'react';
import Button from '../general/button';
import './style.scss';

interface DeleteUserModalProps {
  estado: boolean;
  cambiarEstadoDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConfirmationButtonClick: () => void;
  name: string;
  surname: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  estado,
  cambiarEstadoDeleteUserModal,
  handleDeleteConfirmationButtonClick,
  name,
  surname,
}) => {
  const handleDeleteUserModalClose = () => {
    cambiarEstadoDeleteUserModal(false);
  };

  return (
    <>
      {estado && (
        <div className="Overlay" onClick={handleDeleteUserModalClose}>
          <div
            className="ConfirmationModalContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ConfirmationContenidoModal">
              <h1 className="ConfirmationTituloModalCerrar">
                Se eliminara el siguiente usuario:{' '}
              </h1>
              <p className="Centrar">
                {surname}, {name}
              </p>
              <p className="Disclosure">
                <strong>
                  (Tenga en cuenta que esta accion no puede ser revertida)
                </strong>
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
                        handleDeleteUserModalClose();
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
                        onClick={handleDeleteUserModalClose}
                      />
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserModal;
