import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/general/header';
import SimpleLineGraph from '../../components/dashboard/simple-line-graph';
import Card from '../../components/general/card';
import './style.css';
import SimpleBarGraph from '../../components/dashboard/simple-bar-graph';
import SimplePieGraph from '../../components/dashboard/simple-pie-graph';
import NotificationModal from '../../components/notification-modal';
import Navbar from '../../components/navbar';
import CustomizedTable from '../../components/dashboard/dashboard-table';
import { auditService } from '../../services/ams/audit';
import { Audit } from '../../types/audit';
import { GoDotFill } from 'react-icons/go';
import Spinner from '../../components/general/Spinner';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [audits, setAudits] = useState<Audit[]>([]); // Estado para los últimos 5 audits
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }

    const fetchLast5Audits = async () => {
      try {
        setIsLoading(true);
        const response = await auditService.fetchAllAudit('audit');
        const allAudit = response.data;

        // Ordena por auditDate de forma descendente (más reciente primero)
        const sortedAudits = allAudit.sort((a: Audit, b: Audit) => {
          return (
            new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime()
          );
        });

        // Devuelve los 5 más recientes
        setAudits(sortedAudits.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las auditorías:', error);
      }
    };

    fetchLast5Audits();
  }, [navigate]);

  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  const handleToggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  return (
    <div className="global-background-color">
      <header>
        <div>
          <Header
            name={name && lastName ? `${name} ${lastName}` : 'Guest'}
            onToggleNotificationModal={handleToggleNotificationModal}
          />
        </div>
      </header>
      <Navbar />
      <NotificationModal
        className="notification-modal"
        isOpen={isNotificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
      />
      <h2 className="dashboard-title">Dashboard</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container
          maxWidth={false}
          sx={{
            mt: 2,
            mb: 2,
            maxWidth: '1500px !important',
            height: '805px',
            overflow: 'auto',
          }}
        >
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 360,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Auditorias Mensuales
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Cantidad de auditorias creadas en el ultimo año
                </Typography>
                <SimpleLineGraph />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 360,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Últimas Auditorías
                </Typography>
                <CustomizedTable rows={audits} />
              </Paper>
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 360,
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      Auditorias internas
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <GoDotFill color="#00C49F" size="20px" /> Auditadas
                      <GoDotFill color="#0088FE" size="20px" />
                      Sin Auditar
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <SimplePieGraph type="comunes" />
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 360,
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      Auditorias de AFIP
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <GoDotFill color="#00C49F" size="20px" /> Auditadas
                      <GoDotFill color="#0088FE" size="20px" />
                      Sin Auditar
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <SimplePieGraph type="afip" />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 360,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Volumen anual de auditorias
                </Typography>
                <div style={{ flex: 1 }}>
                  <SimpleBarGraph />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
