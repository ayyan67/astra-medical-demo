"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { year: '1', amount: 400000 },
  { year: '2', amount: 450000 },
  { year: '3', amount: 500000 },
  { year: '4', amount: 550000 },
  { year: '5', amount: 600000 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm text-gray-600">Year {label}</p>
        <p className="text-sm font-bold text-blue-600">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const ReimbursementChart = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Yearly Reimbursements
      </h2>
      <div className="h-[350px]"> {/* Increased height */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value/1000}k`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default ReimbursementChart;
