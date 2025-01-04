import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClaimsOverview = () => {
  const stats = [
    {
      label: 'Submitted Claims',
      value: '21,000',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Total claims processed',
      subtext: '+2.5% from last month'
    },
    {
      label: 'Pending Claims',
      value: '224',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Awaiting response',
      subtext: '4 requiring attention'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Claims Overview</h2>
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl p-6 transition-all hover:scale-[1.02]`}
          >
            <div className={`${stat.textColor} text-4xl font-bold mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-900 font-medium mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-gray-600">
              {stat.description}
            </div>
            <div className={`text-sm mt-2 ${
              stat.subtext.includes('+') ? 'text-green-600' : 'text-gray-600'
            }`}>
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ClaimsOverview;