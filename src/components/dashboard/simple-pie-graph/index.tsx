import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { Audit } from '../../../types/audit';

interface SimplePieGraphProps {
  type: 'comunes' | 'afip';
  audits: Audit[];
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const COLORS = ['#00C49F', '#0088FE'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SimplePieGraph: React.FC<SimplePieGraphProps> = ({ type, audits }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [audits]);

  const filteredAudits = audits.filter((audit) =>
    type === 'afip'
      ? audit.idTipoAuditoria.id === 9
      : audit.idTipoAuditoria.id !== 9
  );

  const auditedCount = filteredAudits.filter(
    (audit) => audit.idAuditado.audited === 'Si'
  ).length;
  const nonAuditedCount = filteredAudits.filter(
    (audit) => audit.idAuditado.audited === 'No'
  ).length;

  const data = [
    { name: 'Auditados', value: auditedCount },
    { name: 'No Auditados', value: nonAuditedCount },
  ];

  const emptyData = [
    { name: 'Auditados', value: 0 },
    { name: 'No Auditados', value: 0 },
  ];

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={isReady ? data : emptyData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SimplePieGraph;
