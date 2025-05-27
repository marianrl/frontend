import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/general/header';
import NotificationModal from '../../components/notification-modal';
import Navbar from '../../components/navbar';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '../../components/general/button';
import { FaFilePdf } from 'react-icons/fa6';
import './style.css';
import { pdfService } from '../../services/integrations/pdfService';
import { auditService } from '../../services/ams/audit';
import { Audit } from '../../types/audit';
import CustomizedTable from '../../components/dashboard/dashboard-table';
import StackedAreaGraph from '../../components/stacked-area-graph';
import ReportPieGraph from '../../components/report-pie-graph';

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [totalAudits, setTotalAudits] = useState(0);
  const [completedAudits, setCompletedAudits] = useState(0);
  const [pendingAudits, setPendingAudits] = useState(0);
  const [recentAudits, setRecentAudits] = useState<Audit[]>([]);
  const [showTable, setShowTable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<
    Array<{
      name: string;
      completed: number;
      pending: number;
    }>
  >([]);
  const [pieData, setPieData] = useState<
    Array<{
      name: string;
      value: number;
    }>
  >([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExporting) {
      interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === '...') return '';
          if (prev === '..') return '...';
          if (prev === '.') return '..';
          return '.';
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExporting]);

  const MONTH_NAMES = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ] as const;

  const handleGeneratePdf = async () => {
    try {
      setIsExporting(true);
      const response = await pdfService.generatePdf('https://example.com');
      if (response.data.status === 'SUCCESS' && response.data.documentUrl) {
        window.open(response.data.documentUrl, '_blank');
      } else {
        console.error('Error generating PDF:', response.data.errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getLastFiveMonths = () => {
    const result = [];
    const currentDate = new Date();

    for (let i = 4; i >= 0; i--) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      result.push(MONTH_NAMES[monthIndex]);
    }

    return result;
  };

  const handleGenerateReport = async () => {
    try {
      const response = await auditService.fetchAllAudit('audit');
      const audits: Audit[] = response.data;

      // Filter audits by date range if dates are selected
      const filteredAudits = audits.filter((audit) => {
        const auditDate = new Date(audit.auditDate);
        if (startDate && endDate) {
          return auditDate >= startDate && auditDate <= endDate;
        }
        return true;
      });

      // Calculate counts
      const total = filteredAudits.length;
      const completed = filteredAudits.filter(
        (audit) => audit.idAuditado.id === 1
      ).length;
      const pending = filteredAudits.filter(
        (audit) => audit.idAuditado.id !== 1
      ).length;

      // Get 10 most recent audits
      const sortedAudits = [...filteredAudits].sort(
        (a, b) =>
          new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime()
      );
      const recent = sortedAudits.slice(0, 10);

      // Prepare chart data
      const months = getLastFiveMonths();
      const chartData = months.map((month) => {
        const monthAudits = filteredAudits.filter((audit) => {
          const auditDate = new Date(audit.auditDate);
          return MONTH_NAMES[auditDate.getMonth()] === month;
        });

        return {
          name: month,
          completed: monthAudits.filter((audit) => audit.idAuditado.id === 1)
            .length,
          pending: monthAudits.filter((audit) => audit.idAuditado.id !== 1)
            .length,
        };
      });

      // Prepare pie chart data
      const internalAudits = filteredAudits.filter(
        (audit) => audit.idTipoAuditoria.id !== 9
      ).length;
      const afipAudits = filteredAudits.filter(
        (audit) => audit.idTipoAuditoria.id === 9
      ).length;

      const pieChartData = [
        { name: 'Auditorias Internas', value: internalAudits },
        { name: 'Auditorias AFIP', value: afipAudits },
      ];

      // Update state
      setTotalAudits(total);
      setCompletedAudits(completed);
      setPendingAudits(pending);
      setRecentAudits(recent);
      setChartData(chartData);
      setPieData(pieChartData);
      setShowTable(true);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} ref={containerRef}>
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
              onClick={handleGeneratePdf}
              disabled={isExporting}
              className={isExporting ? 'export-button-exporting' : ''}
            >
              <FaFilePdf style={{ marginRight: '10px' }} />
              {isExporting ? `Exportando${loadingDots}` : 'Exportar'}
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <DatePicker
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        sx: { width: '320px' },
                      },
                    }}
                  />
                  <DatePicker
                    label="Fecha final"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    minDate={startDate ?? undefined}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        sx: { width: '320px' },
                      },
                    }}
                  />
                  <Button
                    label="Generar"
                    onClick={handleGenerateReport}
                    type="button"
                    backgroundColor="#00004b"
                    hoverColor="#00004b"
                    hoverBorderColor="2px solid #00004b"
                    className="generate-button"
                  />
                </Box>
              </LocalizationProvider>
            </Paper>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias totales
              </Typography>
              <Typography variant="h4">{totalAudits}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias completadas
              </Typography>
              <Typography variant="h4">{completedAudits}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Auditorias pendientes
              </Typography>
              <Typography variant="h4">{pendingAudits}</Typography>
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
              {showTable && <StackedAreaGraph data={chartData} />}
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
              {showTable && <ReportPieGraph data={pieData} />}
            </Paper>
          </Grid>

          {/* Recent Audits Table */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '20px',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Auditorias recientes
              </Typography>
              {showTable && <CustomizedTable rows={recentAudits} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Reports;
