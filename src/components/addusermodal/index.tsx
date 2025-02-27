import React, {useState} from 'react';
import Button from "../general/button";
import { userService } from '../../services/ams/user';
import { User } from '../../types/user';
import AdminDropdown from '../general/admindropdown'

interface AddUserModalProps {
    estado: boolean;
    cambiarEstadoAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddConfirmationButtonClick: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({estado, cambiarEstadoAddUserModal, handleAddConfirmationButtonClick }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const user: User = {
        id: 0,
        name: '',
        lastName: '',
        mail: '',
        password: '',
        role: { id: 999, role: '' }
    };  

    const handleButtonClick = async () => {
        try{
            const response = await userService.createUser('user', user);
        }
        catch(error) {
            console.error('Error al crear el user:', error);
        }
    };

    const handleAddUserModalClose = () => {
        cambiarEstadoAddUserModal(false);
    };

    const handleDropdownSelect = () => {
        
    };

    return (
        <>
                <div>
                    <div className="Overlay">
                        <div className="ModalContainer">
                            <div className="ContenidoModal">
                                <h1 className="TituloModalCerrar">Agregar nuevo usuario</h1>
                                <div>
                                    <ul>
                                        <div className="filaModal">
                                            <li>
                                                Tipo de Rol:
                                            </li>
                                            <li>
                                                {/* <AdminDropdown
                                                
                                                /> */}
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
                                                onClick={() => {
                                                    handleAddUserModalClose();
                                                }}
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
                                                    onClick={() => handleAddUserModalClose()}
                                                />
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default AddUserModal;
