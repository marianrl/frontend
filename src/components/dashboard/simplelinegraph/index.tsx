import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { auditService } from '../../../services/ams/audit';
import { Audit } from '../../../types/audit';

interface DataItem {
  month: string;
  Internas: number;
  AFIP: number;
}

const MonthsEnum = [
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
];

const getLast12Months = () => {
  const currentDate = new Date(); // Ultima fecha conocida
  const months = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    months.push({
      key: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`,
      month: MonthsEnum[date.getMonth()],
    });
  }

  return months;
};

const SimpleLineGraph: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await auditService.fetchAllAudit('audit');
        processData(response.data);
        setTimeout(() => {
          setIsReady(true);
        }, 100);
      } catch (error) {
        console.error('Error al obtener las Auditorias', error);
      }
    };

    fetchAudits();
  }, []);

  const processData = (audits: Audit[]) => {
    const last12Months = getLast12Months();
    const dataMap = new Map<string, { Internas: number; AFIP: number }>();

    last12Months.forEach(({ key }) => {
      dataMap.set(key, { Internas: 0, AFIP: 0 });
    });

    audits.forEach((audit) => {
      const date = new Date(audit.auditDate);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      if (dataMap.has(key)) {
        const current = dataMap.get(key)!;
        if (audit.idTipoAuditoria.id === 9) {
          current.AFIP++;
        } else {
          current.Internas++;
        }
        dataMap.set(key, current);
      }
    });

    const processedData = last12Months.map(({ key, month }) => ({
      month,
      Internas: dataMap.get(key)?.Internas || 0,
      AFIP: dataMap.get(key)?.AFIP || 0,
    }));

    setData(processedData);
  };

  const emptyData = getLast12Months().map(({ month }) => ({
    month,
    Internas: 0,
    AFIP: 0,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight="282px"
      minWidth="825px"
    >
      <LineChart
        data={isReady ? data : emptyData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AFIP" stroke="#8884d8" />
        <Line type="monotone" dataKey="Internas" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineGraph;
