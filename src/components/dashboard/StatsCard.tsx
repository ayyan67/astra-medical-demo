'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  bgColor?: string;
  loading?: boolean;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  bgColor, 
  loading = false 
}: StatsCardProps) => (
  <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-[#0F0F30] rounded animate-pulse mt-2"></div>
          ) : (
            <p className="text-2xl font-bold text-white mt-2">{value}</p>
          )}
          {trend && (
            <p className={`flex items-center text-sm mt-2 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
              {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trend}
            </p>
          )}
        </div>
        <div className={`rounded-full p-3 ${bgColor || 'bg-purple-900/30'}`}>
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatsCard;