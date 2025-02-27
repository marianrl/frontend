import React, { useState, useEffect } from 'react';
import './style.scss';
import { RxCross2 } from 'react-icons/rx';
import Dropdown from '../../components/general/dropdown';
import Button from '../general/button';
import { answerService } from '../../services/ams/answer';
import { Answer } from '../../types/answer';
import ConfirmationModal from '../confimationmodal';
import { commonInputService } from '../../services/ams/commonInput';
import { afipInputService } from '../../services/ams/afipInput';
import { InputRequest } from '../../types/inputRequest';

interface Data {
  id: number;
  lastName: string;
  name: string;
  cuil: number;
  file: number;
  allocation: string;
  client: { client: string };
  uoc: string;
  branch: { branch: string };
  admissionDate: string;
  features: {
    id: number;
    auditType: { id: number; auditType: string };
    answer: { id: number; answer: string };
  };
  audit: {
    id: number;
    auditNumber: number;
    auditDate: string;
    idTipoAuditoria: { id: number; auditType: string };
    idAuditado: { id: number; audited: string };
  };
}

interface DetailsModelProps {
  estado: boolean;
  cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data | null;
  auditType: 'commonAuditDetails' | 'afipAuditDetails';
}

const DetailsModal: React.FC<DetailsModelProps> = ({
  estado,
  cambiarEstadoModal,
  data,
  auditType,
}) => {
  const [selectedOption, setSelectedOption] = useState<Answer | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const auditTypeId = data?.audit.idTipoAuditoria?.id;
    if (auditTypeId !== undefined) {
      answerService
        .fetchAnswerByAuditType('answersByAuditType', auditTypeId)
        .then((response) => {
          const allAnswers = response.data;
          setAnswers(allAnswers);
          setErrorMessage('');
        })
        .catch(() => {
          setAnswers([]);
          setErrorMessage('Error al procesar la solicitud');
          console.log(errorMessage);
        });
    }
    setShowButton(true);
  }, [data?.audit.idTipoAuditoria?.id, errorMessage]);

  const handleDropdownSelect = (option: Answer) => {
    setSelectedOption(option);
    setShowButton(true);
  };

  const handleConfirmationButtonClick = async () => {
    if (selectedOption && data) {
      try {
        // Crear un objeto actualizado de los datos existentes
        const updatedDataRequest: InputRequest = {
          id: data.id,
          lastName: data.lastName,
          name: data.name,
          cuil: data.cuil,
          file: data.file,
          allocation: data.allocation,
          uoc: data.uoc,
          admissionDate: data.admissionDate,
          // Asignar el featuresId a partir del selectedOption
          answerId: selectedOption.id, // Suponiendo que selectedOption.id representa el featuresId
          auditTypeId: data.audit.idTipoAuditoria.id,
        };

        // Llamar al servicio de actualización con los argumentos correctos
        if (auditType === 'commonAuditDetails') {
          await commonInputService.updateCommonInput(
            'commonInput',
            data.id.toString(),
            updatedDataRequest
          );
        } else {
          await afipInputService.updateAfipInput(
            'afipInput',
            data.id.toString(),
            updatedDataRequest
          );
        }
        window.location.reload();
      } catch (error) {
        console.error('Error al actualizar el input común:', error);
      }
    }
  };

  const isDropdownDisabledForUser = (data: Data | null): boolean => {
    return data?.features.auditType.auditType === 'SIN RESPUESTA';
  };

  const handleModalClose = () => {
    cambiarEstadoModal(false);
    setShowButton(false);
  };

  const isButtonDisabled = selectedOption === null;

  return (
    <>
      {estado && (
        <div>
          <div className="Overlay">
            <div className="ContendorModal">
              <div className="Encabezado">
                <h3 className="TituloModal">
                  {data ? `${data.lastName} ${data.name}` : ''}
                </h3>
              </div>
              <button className="BotonCerrar" onClick={handleModalClose}>
                <i className="Cruz">
                  <RxCross2 />
                </i>
              </button>
              <div className="Contenido">
                <ul>
                  <div className="fila">
                    <li>
                      CUIL:
                      <div>
                        <strong>{data ? data.cuil : ''}</strong>
                      </div>
                    </li>
                    <li>
                      N° Legajo:
                      <div>
                        <strong>{data ? data.file : ''}</strong>
                      </div>
                    </li>
                  </div>
                  <div className="fila">
                    <li>
                      Asignacion:
                      <div>
                        <strong>{data ? data.allocation : ''}</strong>
                      </div>
                    </li>
                    <li>
                      Cliente:
                      <div>
                        <strong>{data ? data.client.client : ''}</strong>
                      </div>
                    </li>
                  </div>
                  <div className="fila">
                    <li>
                      UOC:
                      <div>
                        <strong>{data ? data.uoc : ''}</strong>
                      </div>
                    </li>
                    <li>
                      Sucursal:
                      <div>
                        <strong>{data ? data.branch.branch : ''}</strong>
                      </div>
                    </li>
                  </div>
                  <div className="fila">
                    <li>
                      Fecha de Ingreso:
                      <div>
                        <strong>{data ? data.admissionDate : ''}</strong>
                      </div>
                    </li>
                    <li>
                      Fecha de la Auditoria:
                      <div>
                        <strong>{data ? data.audit.auditDate : ''}</strong>
                      </div>
                    </li>
                  </div>
                  <div className="fila">
                    <li>
                      Tipo de Auditoria:
                      <div>
                        <strong>
                          {data ? data.audit.idTipoAuditoria.auditType : ''}
                        </strong>
                      </div>
                    </li>
                  </div>
                  {isDropdownDisabledForUser(data) ? (
                    <div className="fila">
                      <li className="item">
                        Respuesta:
                        <Dropdown
                          onSelect={handleDropdownSelect}
                          answers={answers}
                          maxLength={12}
                        />
                      </li>
                      <li className="item">
                        <Button
                          type="button"
                          label="Responder"
                          hoverColor="#00004b"
                          hoverBorderColor="2px solid #00004b"
                          onClick={() => setShowConfirmationModal(true)}
                          disabled={!showButton || isButtonDisabled}
                        />
                      </li>
                    </div>
                  ) : (
                    <div className="fila">
                      <li></li>
                      <li className="respuesta">
                        <strong>
                          Respuesta: {data?.features.answer.answer}
                        </strong>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {showConfirmationModal && (
            <ConfirmationModal
              estado={showConfirmationModal}
              cambiarEstadoConfirmationModal={setShowConfirmationModal}
              handleConfirmationButtonClick={handleConfirmationButtonClick}
              handleModalClose={handleModalClose}
              selectedOption={selectedOption}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailsModal;
