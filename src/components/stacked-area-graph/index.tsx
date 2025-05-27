import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StackedAreaGraphProps {
  data: {
    name: string;
    completed: number;
    pending: number;
  }[];
}

const StackedAreaGraph: React.FC<StackedAreaGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="completed"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Completadas"
        />
        <Area
          type="monotone"
          dataKey="pending"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          name="Pendientes"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaGraph;
