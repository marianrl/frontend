import React, { useEffect, useState } from 'react';
import Button from '../general/button';
import AdminDropdown from '../general/admindropdown';
import { Role } from '../../types/role';
import { roleService } from '../../services/ams/role';
import InputWrapper from '../inputfield';
import { userService } from '../../services/ams/user';
import { User } from '../../types/user';
import { UserMailRequest } from '../../types/user_mail_request';
import UserConfirmationModal from '../userconfimationmodal';

interface AddUserModalProps {
  cambiarEstadoAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddConfirmationButtonClick: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  cambiarEstadoAddUserModal,
  handleAddConfirmationButtonClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<Role | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [userRoles, setUsersRoles] = useState<Role[]>([]);
  const [mailError, setMailError] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showWrongMailMessageModal, setShowWrongMailMessageModal] =
    useState(false);

  useEffect(() => {
    async function getAllRoles() {
      try {
        const response = await roleService.fetchAllRoles('role');
        const roles = response?.data || [];
        setUsersRoles(roles);
      } catch (error) {
        setUsersRoles([]);
      }
    }
    getAllRoles();
  }, []);

  // Función de validación de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejo del cambio de email con validación
  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMail(value);
    setMailError(validateEmail(value) ? '' : 'Formato de correo inválido');
  };

  const handleConfirmationButtonClick = async () => {
    if (!selectedOption || mailError) {
      console.error('Debe seleccionar un rol y proporcionar un email válido');
      return;
    }

    const newUser: User = {
      id: 0,
      name: nombre,
      lastName: apellido,
      mail: mail,
      password: password,
      role: selectedOption,
    };

    const userMail: UserMailRequest = {
      mail: mail,
    };

    try {
      const exists = await userService.userExists('user/exists', userMail);
      if (!exists) {
        const response = await userService.createUser('user', newUser);
        console.log('Usuario creado con éxito:', response);
        handleAddConfirmationButtonClick();
        setShowConfirmationModal(false);
        cambiarEstadoAddUserModal(false);
        window.location.reload();
      } else {
        setShowWrongMailMessageModal(true);
      }
    } catch (error) {
      console.error('Error al crear el usuario: ', error);
    }
  };

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleConfimationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseShowWrongMailMessageModal = () => {
    setShowWrongMailMessageModal(false);
    setShowConfirmationModal(false);
  };

  const isFormValid =
    nombre && apellido && mail && password && selectedOption && !mailError;

  return (
    <div>
      <div className="Overlay">
        <div className="ModalContainer">
          <div className="ContenidoModal">
            <h1 className="TituloModalCerrar">Agregar nuevo usuario</h1>
            <div>
              <ul>
                <div className="filaModal">
                  <li>Nombre: </li>
                  <InputWrapper
                    label="Nombre"
                    type="text"
                    htmlFor="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="filaModal">
                  <li>Apellido: </li>
                  <InputWrapper
                    label="Apellido"
                    type="text"
                    htmlFor="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className="filaModal">
                  <li>Mail: </li>
                  <InputWrapper
                    label="Mail"
                    type="text"
                    htmlFor="text"
                    value={mail}
                    onChange={handleMailChange}
                  />
                  {mailError && (
                    <span className="error-message">{mailError}</span>
                  )}
                </div>
                <div className="filaModal">
                  <li>Contraseña: </li>
                  <InputWrapper
                    label="Contraseña"
                    type="text"
                    htmlFor="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="filaModal">
                  <li>Tipo de Rol:</li>
                  <li>
                    <AdminDropdown
                      onSelect={setSelectedOption}
                      roles={userRoles}
                      maxLength={12}
                    />
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
                    {...(isFormValid && {
                      borderColor: '#32a852',
                      backgroundColor: ' #32a852',
                    })}
                    hoverColor=" #32a852"
                    hoverBackgroundColor=""
                    hoverBorderColor="2px solid #32a852"
                    onClick={handleOpenConfirmationModal}
                    disabled={!isFormValid}
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
                      onClick={() => cambiarEstadoAddUserModal(false)}
                    />
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <UserConfirmationModal
          estado={showConfirmationModal}
          text="Desea crear este usuario?"
          confirmLabel="Crear"
          cancelLabel="Cancelar"
          cambiarEstadoConfirmationModal={setShowConfirmationModal}
          handleConfirmationButtonClick={handleConfirmationButtonClick}
          handleModalClose={handleConfimationModalClose}
        />
      )}
      {showWrongMailMessageModal && (
        <UserConfirmationModal
          estado={showWrongMailMessageModal}
          text="El mail ingresado ya existe"
          confirmLabel="Aceptar"
          cancelLabel="Cancelar"
          cambiarEstadoConfirmationModal={setShowWrongMailMessageModal}
          handleConfirmationButtonClick={handleCloseShowWrongMailMessageModal}
          handleModalClose={handleCloseShowWrongMailMessageModal}
        />
      )}
    </div>
  );
};

export default AddUserModal;
