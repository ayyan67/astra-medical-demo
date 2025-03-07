'use client';

import React, { useMemo } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  TooltipProps
} from 'recharts';

interface ChartDataPoint {
  year: string;
  amount: number;
}

interface YearlyReimbursementsChartProps {
  data?: ChartDataPoint[];
  className?: string;
}

// Sample data for the chart
const defaultData: ChartDataPoint[] = [
  { year: '2020', amount: 440000 },
  { year: '2021', amount: 470000 },
  { year: '2022', amount: 510000 },
  { year: '2023', amount: 550000 },
  { year: '2024', amount: 590000 },
  { year: '2025', amount: 610000 }
];

const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: TooltipProps<number, string> & { payload?: Array<{ value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A20] p-3 border border-purple-900/30 rounded-md shadow-lg">
        <p className="text-gray-300 text-sm font-medium">{`Year: ${label}`}</p>
        <p className="text-purple-400 text-sm font-bold">
          {`$${Number(payload[0].value).toLocaleString()}`}
        </p>
      </div>
    );
  }

  return null;
};

interface CustomDotProps {
  cx: number;
  cy: number; 
  index: number;
  dataLength: number;
}

const CustomDot = ({ cx, cy, index, dataLength }: CustomDotProps) => {
  // Highlight the most recent data point (last in the array)
  if (index === dataLength - 1) {
    return (
      <svg x={cx - 5} y={cy - 5} width="10" height="10">
        <circle cx="5" cy="5" r="5" fill="#9333EA" />
        <circle cx="5" cy="5" r="3" fill="#F3E8FF" />
      </svg>
    );
  }
  
  return (
    <svg x={cx - 4} y={cy - 4} width="8" height="8">
      <circle cx="4" cy="4" r="3" fill="#9333EA" />
    </svg>
  );
};

const CustomizedAxisTick = ({
  x,
  y, 
  payload
}: {
  x: number;
  y: number;
  payload: { value: string };
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="12px"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomYAxisTick = ({
  x,
  y,
  payload
}: {
  x: number;
  y: number; 
  payload: { value: number };
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-10}
        textAnchor="end"
        fill="#9CA3AF"
        fontSize="12px"
      >
        ${(payload.value / 1000).toFixed(0)}k
      </text>
    </g>
  );
};

export default function YearlyReimbursementsChart({ 
  data = defaultData,
  className = ''
}: YearlyReimbursementsChartProps) {
  // useMemo to prevent re-rendering performance issues with Recharts
  const renderCustomizedDot = useMemo(() => (props: any) => {
    return <CustomDot {...props} dataLength={data.length} />;
  }, [data.length]);

  return (
    <div className={`h-[300px] w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorReimbursement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333EA" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#1F1F4D" 
          />
          <XAxis 
            dataKey="year" 
            tick={CustomizedAxisTick} 
            axisLine={{ stroke: '#1F1F4D' }}
            tickLine={false}
          />
          <YAxis 
            tick={CustomYAxisTick} 
            axisLine={{ stroke: '#1F1F4D' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#9333EA" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorReimbursement)"
            activeDot={{ r: 6, fill: "#9333EA", stroke: "#F3E8FF", strokeWidth: 2 }}
            dot={renderCustomizedDot}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}