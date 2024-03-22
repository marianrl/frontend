import React, { useState, useEffect } from 'react';
import './style.scss';
import { RxCross2 } from 'react-icons/rx';
import Dropdown from "../dropdown";
import Button from "../button";

interface Data {
    lastName: string;
    name: string;
    cuil: number;
    file: number;
    allocation: string;
    client: { client: string }
    uoc: string;
    branch: { branch: string };
    admissionDate: string;
    features: { auditType: { auditType: string }; answer: { answer: string } };
    audit: { auditNumber: number; auditDate: string; idTipoAuditoria: { auditType: string }; idAuditado: { audited: string } };
}

interface ModelProps {
    estado: boolean;
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: Data | null;
}

const Modal: React.FC<ModelProps> = ({ estado, cambiarEstadoModal, data }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showButton, setShowButton] = useState(false); // Estado para controlar la visibilidad del botón

    useEffect(() => {
        setShowButton(true); // Al montar el componente, mostrar el botón
        //TODO
        // answerService.fetchAnswerByAuditType('answersByAuditType',auditNumberValue)
        //     .then((response) => {
        //         const allAudit = response.data;
        //         setData(allAudit);
        //         setIsLoading(false); // Establecer isLoading en false cuando se completó la carga de datos
        //         console.log(allAudit);
        //     })
        //     .catch(() => {
        //         setData([]);
        //         setIsLoading(false); // Establecer isLoading en false si hubo un error al cargar los datos
        //         setErrorMessage('Error al procesar la solicitud');
        //     });
    }, []);

    const handleDropdownSelect = (option: string) => {
        setSelectedOption(option);
        setShowButton(true); // Mostrar el botón cuando se selecciona una opción
    };

    const handleButtonClick = () => {
        cambiarEstadoModal(!estado);
        setShowButton(false);
    };

    const handleModalClose = () => {
        cambiarEstadoModal(false);
        setShowButton(false); // Ocultar el botón al cerrar el modal
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
                                            <Dropdown onSelect={handleDropdownSelect} />
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

export default Modal;
