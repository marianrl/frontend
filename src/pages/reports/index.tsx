import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/general/header';
import NotificationModal from '../../components/notificationmodal';
import Navbar from '../../components/navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './reports.css';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Button from '../../components/general/button';
import { FaFilePdf } from 'react-icons/fa6';

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // Redirigir solo si el usuario no está autenticado
      navigate('/login');
    }
  }, [navigate]);

  const handleToggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  return (
    <div className="global-background-color">
      <Navbar />
      <div>
        <Header
          name={name && lastName ? `${name} ${lastName}` : 'Guest'}
          onToggleNotificationModal={handleToggleNotificationModal}
        />
        <NotificationModal
          className="notification-modal"
          isOpen={isNotificationModalOpen}
          onClose={() => setNotificationModalOpen(false)}
        />
      </div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={8}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Reportes</h2>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              type="button"
              backgroundColor="#960909"
              hoverColor="#960909"
              hoverBorderColor="2px solid #960909"
              onClick={() => {}}
            >
              <FaFilePdf style={{ marginRight: '10px' }} /> Exportar
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* Date Range Selector */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Seleccionar rango de fechas
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Fecha de inicio"
                  className="form-control date-picker-input"
                  wrapperClassName="date-picker-wrapper"
                />
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate ?? undefined}
                  placeholderText="Fecha final"
                  className="form-control date-picker-input"
                  wrapperClassName="date-picker-wrapper"
                />
              </Box>
            </Paper>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias totales
              </Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias completados
              </Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias pendientes
              </Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tendencias de auditorias
              </Typography>
              {/* Chart will be added here */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Distribución de auditorias
              </Typography>
              {/* Chart will be added here */}
            </Paper>
          </Grid>

          {/* Recent Audits Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias recientes
              </Typography>
              {/* Table will be added here */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Reports;
