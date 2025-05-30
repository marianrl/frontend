import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Audit } from '../../../types/audit';

interface DataItem {
  year: string;
  Internas: number;
  AFIP: number;
}

interface SimpleBarGraphProps {
  width?: string | number;
  height?: string | number;
  audits: Audit[];
}

const SimpleBarGraph: React.FC<SimpleBarGraphProps> = ({
  width = '100%',
  height = '100%',
  audits,
}) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    processData(audits);
    setIsReady(true);
  }, [audits]);

  const processData = (audits: Audit[]) => {
    const dataMap = new Map<string, { Internas: number; AFIP: number }>();

    audits.forEach((audit) => {
      const year = new Date(audit.auditDate).getFullYear().toString();

      if (!dataMap.has(year)) {
        dataMap.set(year, { Internas: 0, AFIP: 0 });
      }

      const current = dataMap.get(year)!;

      if (audit.idTipoAuditoria.id === 9) {
        current.AFIP++;
      } else {
        current.Internas++;
      }

      dataMap.set(year, current);
    });

    const processedData: DataItem[] = Array.from(dataMap.entries())
      .map(([year, counts]) => ({
        year,
        Internas: counts.Internas,
        AFIP: counts.AFIP,
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    setData(processedData);
  };

  const emptyData = [
    { year: '2020', Internas: 0, AFIP: 0 },
    { year: '2021', Internas: 0, AFIP: 0 },
    { year: '2022', Internas: 0, AFIP: 0 },
    { year: '2023', Internas: 0, AFIP: 0 },
    { year: '2024', Internas: 0, AFIP: 0 },
  ];

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={isReady ? data : emptyData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="AFIP"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Internas"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarGraph;
