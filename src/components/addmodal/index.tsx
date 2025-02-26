import React, {useEffect, useState} from 'react';
import './style.scss';
import Button from "../general/button";
import AuditTypeDropdown from "../audittypedropdown";
import {auditTypeService} from "../../services/ams/auditType";
import {AuditType} from "../../types/auditType";
import {auditService} from "../../services/ams/audit";
import {useNavigate} from "react-router-dom";

interface AddModalProps {
    estado: boolean;
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
    auditType: "commonAuditDetails" | "afipAuditDetails";
}

const AddModal: React.FC<AddModalProps> = ({ estado, cambiarEstadoModal , auditType}) => {
    const navigate = useNavigate();
    const [audits, setAudits] = useState<AuditType[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState<AuditType | null>(null);

    useEffect(() => {
            auditTypeService.fetchAllAuditType('auditType')
                .then((response) => {
                    const allAuditTypes = response.data;
                    setAudits(allAuditTypes);
                    setErrorMessage('');
                })
                .catch(() => {
                    setAudits([]);
                    setErrorMessage('Error al procesar la solicitud');
                    console.log(errorMessage);
                });
            
        },[errorMessage]);

    const handleButtonClick = async () => {
        if (selectedOption) {
            try{
                const response = await auditService.createAudit('audit', selectedOption.id);
                const auditId = response.auditId; // Obtén el ID de la respuesta
                if(auditType === "commonAuditDetails") {
                    navigate(`/audit/commonAuditDetails/${auditId}`); // Utiliza el ID en el path de navigate
                }
                else {
                    navigate(`/auditafip/afipAuditDetails/${auditId}`); // Utiliza el ID en el path de navigate
                }

            }
            catch(error) {
                console.error('Error al obtener los AuditType:', error);
            }
        }
    };

    const handleModalClose = () => {
        cambiarEstadoModal(false);
    };

    const handleDropdownSelect = (option: AuditType) => {
        setSelectedOption(option);
    };

    return (
        <>
            {estado &&
                <div>
                    <div className="Overlay">
                        <div className="ModalContainer">
                            <div className="ContenidoModal">
                                <h1 className="TituloModalCerrar">Agregar nueva auditoria interna</h1>
                                <div>
                                    <ul>
                                        <div className="filaModal">
                                            <li>
                                                Tipo de Auditoria:
                                            </li>
                                            <li>
                                                <AuditTypeDropdown
                                                    onSelect={handleDropdownSelect}
                                                    auditTypes={
                                                    auditType === "commonAuditDetails" ?
                                                        audits.filter(audit => audit.auditType !== "SIN RESPUESTA" && audit.auditType !== "CRUCE DE AFIP") :
                                                        audits.filter(audit => audit.auditType === "CRUCE DE AFIP")}
                                                    maxLength={12} />
                                            </li>
                                        </div>
                                    </ul>
                                </div>
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
