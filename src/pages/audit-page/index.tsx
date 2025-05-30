import React, { useEffect, useState } from 'react';
import Header from '../../components/general/header';
import Table from '../../components/table';
import { useNavigate } from 'react-router-dom';
import { auditService } from '../../services/ams/audit';
import Spinner from '../../components/general/Spinner';
import NotificationModal from '../../components/notification-modal';
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
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await auditService.fetchAllAudit('audit');
        if (isMounted) {
          const allAudit = response.data;
          const filteredAudit = allAudit.filter(
            (audit: AuditData) => audit.idTipoAuditoria.id !== 9
          );
          setData(filteredAudit);
          console.log(filteredAudit);
        }
      } catch (error) {
        if (isMounted) {
          setData([]);
          setErrorMessage('Error al procesar la solicitud');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
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
