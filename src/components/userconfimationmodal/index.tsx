import React from 'react';
import Button from '../general/button';
import { User } from '../../types/user';

interface UserConfirmationModelProps {
  estado: boolean;
  cambiarEstadoConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmationButtonClick: () => void;
  text: string;
  confirmLabel: string;
  cancelLabel: string;
}

const UserConfirmationModal: React.FC<UserConfirmationModelProps> = ({
  estado,
  text,
  confirmLabel,
  cancelLabel,
  cambiarEstadoConfirmationModal,
  handleModalClose,
  handleConfirmationButtonClick,
}) => {
  const handleConfirmationModalClose = () => {
    cambiarEstadoConfirmationModal(false);
  };

  const handleDetailsModalClose = () => {
    handleModalClose(false);
  };

  return (
    <>
      {estado && (
        <div
          className="Overlay"
          onClick={() => cambiarEstadoConfirmationModal(false)}
        >
          <div
            className="ConfirmationModalContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ConfirmationContenidoModal">
              <h1 className="ConfirmationTituloModalCerrar">{text}</h1>
              <ul>
                <div className="filaModal">
                  <li>
                    <Button
                      type="button"
                      label={confirmLabel}
                      backgroundColor="#fc5151"
                      hoverColor="#fc5151"
                      hoverBorderColor="2px solid #fc5151"
                      onClick={() => {
                        handleConfirmationButtonClick();
                        handleConfirmationModalClose();
                        handleDetailsModalClose();
                      }}
                    />
                  </li>
                  <li>
                    <div>
                      <Button
                        type="button"
                        label={cancelLabel}
                        borderColor="2px solid #00004b"
                        color="#00004b"
                        backgroundColor="#ffffff"
                        hoverColor="#ffffff"
                        hoverBorderColor="2px solid #00004b"
                        hoverBackgroundColor="#00004b"
                        onClick={handleConfirmationModalClose}
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

export default UserConfirmationModal;
