import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface DoublePieGraphProps {
  width: number;
  height: number;
  outerRadius: number;
  innerRadius: number;
}

const data01: DataItem[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const data02: DataItem[] = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

const DoublePieGraph: React.FC<DoublePieGraphProps> = ({
  width,
  height,
  outerRadius,
  innerRadius,
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart width={width} height={height}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoublePieGraph;
