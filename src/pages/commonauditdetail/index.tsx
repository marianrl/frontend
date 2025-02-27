import React, { useEffect, useState } from 'react';
import Header from '../../components/general/header';
import TableDetails from '../../components/tabledetails';
import { useNavigate, useParams } from 'react-router-dom';
import { commonInputService } from '../../services/ams/commonInput';
import Spinner from '../../components/general/Spinner';
import NotificationModal from '../../components/notificationmodal';
import Navbar from '../../components/navbar';

const CommonAuditDetail: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const { auditNumber } = useParams();
  let auditNumberValue: number = 0;
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // Redirigir solo si el usuario no está autenticado
      navigate('/login');
    }
  }, [navigate]);

  if (auditNumber != null) {
    auditNumberValue = parseInt(auditNumber, 10);
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Establecer isLoading en true al iniciar la carga de datos
      setTimeout(() => {
        // Establecer una duración mínima de 1 segundo para el estado de carga
        commonInputService
          .fetchCommonAuditById('commonInput', auditNumberValue)
          .then((response) => {
            const allAudit = response.data;
            setData(allAudit);
            setIsLoading(false); // Establecer isLoading en false cuando se completó la carga de datos
            console.log(allAudit);
          })
          .catch(() => {
            setData([]);
            setIsLoading(false); // Establecer isLoading en false si hubo un error al cargar los datos
            setErrorMessage('Error al procesar la solicitud');
          });
      }, 100); // 1000 milisegundos = 1 segundo
    }
    fetchData();
  }, [auditNumberValue]);

  const handleToggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  return (
    <div className="global-background-color">
      <header>
        <Navbar />
        <div>
          <Header
            name={name && lastName ? `${name} ${lastName}` : 'Guest'}
            onToggleNotificationModal={handleToggleNotificationModal}
          />
        </div>
      </header>
      <NotificationModal
        className="notification-modal"
        isOpen={isNotificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
      />
      {isLoading ? ( // Mostrar estado de carga si isLoading es true
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <TableDetails
          data={data}
          CommonOrAfipAudit={'commonAuditDetails'}
          auditId={auditNumberValue}
        />
      )}
    </div>
  );
};

export default CommonAuditDetail;
