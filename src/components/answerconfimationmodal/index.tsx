import React from 'react';
import './style.scss';
import Button from '../general/button';
import { Answer } from '../../types/answer';

interface AnswerConfirmationModelProps {
  estado: boolean;
  cambiarEstadoConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmationButtonClick: () => void;
  selectedOption: Answer | null;
}

const AnswerConfirmationModal: React.FC<AnswerConfirmationModelProps> = ({
  estado,
  cambiarEstadoConfirmationModal,
  handleModalClose,
  handleConfirmationButtonClick,
  selectedOption,
}) => {
  const answer = selectedOption?.answer;

  const handleConfirmationModalClose = () => {
    cambiarEstadoConfirmationModal(false);
  };

  const handleDetailsModalClose = () => {
    handleModalClose(false);
  };

  return (
    <>
      {estado && (
        <div className="Overlay">
          <div className="ConfirmationModalContainer">
            <div className="ConfirmationContenidoModal">
              <h1 className="ConfirmationTituloModalCerrar">
                Su respuesta sera:{' '}
              </h1>
              <p className="Centrar">{answer}</p>
              <p className="Disclosure">
                <strong>
                  (Tenga en cuenta que su respuesta no podrá ser modificada)
                </strong>
              </p>
              <ul>
                <div className="filaModal">
                  <li>
                    <Button
                      type="button"
                      label="Confirmar"
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
                        label="Cancelar"
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

export default AnswerConfirmationModal;
