import React, { useEffect, useState } from 'react';
import Header from '../../components/general/header';
import Table from '../../components/table';
import { useNavigate } from 'react-router-dom';
import { auditService } from '../../services/ams/audit';
import Spinner from '../../components/general/Spinner';
import NotificationModal from '../../components/notificationmodal';
import Navbar from '../../components/navbar';

interface TipoAuditoria {
  id: number;
  auditType: string;
}

interface Auditado {
  id: number;
  audited: string;
}

interface AuditData {
  id: number;
  auditNumber: number;
  auditDate: string;
  idTipoAuditoria: TipoAuditoria;
  idAuditado: Auditado;
}

const Audit: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [data, setData] = useState<AuditData[]>([]);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // Redirigir solo si el usuario no está autenticado
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Establecer isLoading en true al iniciar la carga de datos
      setTimeout(() => {
        // Establecer una duración mínima de 1 segundo para el estado de carga
        auditService
          .fetchAllAudit('audit')
          .then((response) => {
            const allAudit = response.data;

            const filteredAudit = allAudit.filter(
              (audit: AuditData) => audit.idTipoAuditoria.id !== 9
            );

            setData(filteredAudit);
            setIsLoading(false); // Establecer isLoading en false cuando se completó la carga de datos
            console.log(filteredAudit);
          })
          .catch(() => {
            setData([]);
            setIsLoading(false); // Establecer isLoading en false si hubo un error al cargar los datos
            setErrorMessage('Error al procesar la solicitud');
          });
      }, 100); // 1000 milisegundos = 1 segundo
    }
    fetchData();
  }, []);

  const handleAuditClick = (auditNumber: number) => {
    navigate(`/audit/commonAuditDetails/${auditNumber}`);
  };

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
        <Table
          data={data}
          onAuditClick={handleAuditClick}
          auditType="audit"
          auditTypeDetails="commonAuditDetails"
        />
      )}
    </div>
  );
};

export default Audit;
