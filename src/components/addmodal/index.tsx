import React, {useEffect, useState} from 'react';
import './style.scss';
import Button from "../button";
import AuditTypeDropdown from "../audittypedropdown";
import {auditTypeService} from "../../services/ams/auditType";
import {AuditType} from "../../types/auditType";
import {auditService} from "../../services/ams/audit";

interface AddModelProps {
    estado: boolean;
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal: React.FC<AddModelProps> = ({ estado, cambiarEstadoModal }) => {
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
                await auditService.createAudit('audit', selectedOption.id);
                window.location.reload();
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
                                                    auditTypes={audits.filter(audit => audit.auditType !== "SIN RESPUESTA")}
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
