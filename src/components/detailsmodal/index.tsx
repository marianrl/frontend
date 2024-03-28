import React, { useState, useEffect } from 'react';
import './style.scss';
import { RxCross2 } from 'react-icons/rx';
import Dropdown from "../dropdown";
import Button from "../button";
import { answerService } from "../../services/ams/answer";
import { commonInputService } from "../../services/ams/commonInput";
import {Answer} from "../../types/answer";

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
    features: { auditType: { id: number; auditType: string }; answer: { id: number, answer: string } };
    audit: { id: number, auditNumber: number; auditDate: string; idTipoAuditoria: { id: number; auditType: string }; idAuditado: { id: number, audited: string } };
}

interface DetailsModelProps {
    estado: boolean;
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: Data | null;
}

const DetailsModal: React.FC<DetailsModelProps> = ({ estado, cambiarEstadoModal, data }) => {
    const [selectedOption, setSelectedOption] = useState<Answer | null>(null);
    const [showButton, setShowButton] = useState(false); // Estado para controlar la visibilidad del botón
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const auditTypeId = data?.audit.idTipoAuditoria?.id; // Acceder al ID de manera segura
        if (auditTypeId !== undefined) {
            answerService.fetchAnswerByAuditType('answersByAuditType', auditTypeId)
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
        setShowButton(true); // Al montar el componente, mostrar el botón
    }, [data?.audit.idTipoAuditoria?.id, errorMessage]);

    const handleDropdownSelect = (option: Answer) => {
        setSelectedOption(option);
        setShowButton(true); // Mostrar el botón cuando se selecciona una opción
    };


    const handleButtonClick = async () => {
        if (selectedOption && data) {
            try {
                const updatedData = {
                    ...data,
                    features: {
                        ...data.features,
                        auditType: {
                            id: data.audit.idTipoAuditoria.id,
                            auditType: data.audit.idTipoAuditoria.auditType
                        },
                        answer: {
                            id: selectedOption.id, // Opcional: aquí podrías asignar el id correspondiente a la respuesta seleccionada, si lo necesitas
                            answer: selectedOption.answer
                        }
                    }
                };

                await commonInputService.updateCommonInput('commonInput', data.id.toString(), updatedData);
                cambiarEstadoModal(!estado);
                setShowButton(false);
            } catch (error) {
                console.error('Error al actualizar el input común:', error);
            }
        }
    };

    const handleModalClose = () => {
        cambiarEstadoModal(false);
        setShowButton(false); // Ocultar el botón al cerrar el detailsmodal
    };

    const isButtonDisabled = selectedOption === null;

    return (
        <>
            {estado &&
                <div>
                    <div className="Overlay">
                        <div className="ContendorModal">
                            <div className="Encabezado">
                                <h3 className="TituloModal">{data ? `${data.lastName} ${data.name}` : ""}</h3>
                            </div>
                            <button className="BotonCerrar" onClick={handleModalClose}>
                                <i className="Cruz"><RxCross2 /></i>
                            </button>
                            <div className="Contenido">
                                <ul>
                                    <div className="fila">
                                        <li>
                                            CUIL:
                                            <div><strong>{data ? data.cuil : ""}</strong></div>
                                        </li>
                                        <li>
                                            N° Legajo:
                                            <div><strong>{data ? data.file : ""}</strong></div>
                                        </li>
                                    </div>
                                    <div className="fila">
                                        <li>
                                            Asignacion:
                                            <div><strong>{data ? data.allocation : ""}</strong></div>
                                        </li>
                                        <li>
                                            Cliente:
                                            <div><strong>{data ? data.client.client : ""}</strong></div>
                                        </li>
                                    </div>
                                    <div className="fila">
                                        <li>
                                            UOC:
                                            <div><strong>{data ? data.uoc : ""}</strong></div>
                                        </li>
                                        <li>
                                            Sucursal:
                                            <div><strong>{data ? data.branch.branch : ""}</strong></div>
                                        </li>
                                    </div>
                                    <div className="fila">
                                        <li>
                                            Fecha de Ingreso:
                                            <div><strong>{data ? data.admissionDate : ""}</strong></div>
                                        </li>
                                        <li>
                                            Fecha de la Auditoria:
                                            <div><strong>{data ? data.audit.auditDate : ""}</strong></div>
                                        </li>
                                    </div>
                                    <div className="fila">
                                        <li>
                                            Tipo de Auditoria:
                                            <div><strong>{data ? data.audit.idTipoAuditoria.auditType : ""}</strong></div>
                                        </li>
                                    </div>
                                    <div className="fila">
                                        <li className="item">
                                            Respuesta:
                                            <Dropdown onSelect={handleDropdownSelect} answers={answers} />
                                        </li>
                                        <li className="item">
                                            <Button
                                                type="button"
                                                label="Responder"
                                                hoverColor="#00004b"
                                                hoverBorderColor="2px solid #00004b"
                                                onClick={handleButtonClick}
                                                disabled={!showButton || isButtonDisabled}
                                            />
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

export default DetailsModal;
