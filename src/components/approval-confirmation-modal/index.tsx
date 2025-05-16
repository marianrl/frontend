import React from 'react';
import Button from '../general/button';
import './style.scss';

interface ApprovalConfirmationModalProps {
  estado: boolean;
  cambiarEstadoApprovalConfirmationModal: (estado: boolean) => void;
  handleModalClose: () => void;
  handleApprovalConfirmationButtonClick: () => void;
  auditType: string;
  auditDate: string;
}

const ApprovalConfirmationModal: React.FC<ApprovalConfirmationModalProps> = ({
  estado,
  cambiarEstadoApprovalConfirmationModal,
  handleModalClose,
  handleApprovalConfirmationButtonClick,
  auditType,
  auditDate,
}) => {
  const handleApprovalConfirmationModalClose = () => {
    cambiarEstadoApprovalConfirmationModal(false);
  };

  const handleDetailsModalClose = () => {
    handleModalClose();
  };

  return (
    <>
      {estado && (
        <div
          className="Overlay"
          onClick={() => cambiarEstadoApprovalConfirmationModal(false)}
        >
          <div
            className="ConfirmationModalContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ConfirmationContenidoModal">
              <h1 className="ConfirmationTituloModalCerrar">
                Se aprobará la siguiente auditoria:{' '}
              </h1>
              <p className="Centrar">
                {auditType} - {auditDate}
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
                      label="Aprobar"
                      backgroundColor="#92a9fc"
                      hoverColor="#92a9fc"
                      hoverBorderColor="2px solid #92a9fc"
                      onClick={() => {
                        handleApprovalConfirmationButtonClick();
                        handleApprovalConfirmationModalClose();
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
                        onClick={handleApprovalConfirmationModalClose}
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

export default ApprovalConfirmationModal;
