'use client';

import React from 'react';
import Link from 'next/link';
import { Info, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

type AlertType = 'info' | 'warning' | 'success';

interface AlertCardProps {
  type: AlertType;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

const AlertCard = ({ 
  type, 
  message, 
  actionLabel = "View", 
  actionHref = "#" 
}: AlertCardProps) => {
  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle2,
  };
  
  const colors = {
    info: "border-blue-500/50 bg-blue-500/10",
    warning: "border-orange-500/50 bg-orange-500/10",
    success: "border-green-500/50 bg-green-500/10",
  };
  
  const IconComponent = icons[type] || Info;
  
  return (
    <div className={`p-4 rounded-lg border ${colors[type] || colors.info} flex items-center gap-3`}>
      <IconComponent className={`h-5 w-5 ${
        type === 'info' ? 'text-blue-400' : 
        type === 'warning' ? 'text-orange-400' : 
        'text-green-400'
      }`} />
      <span className="text-sm flex-1">{message}</span>
      <Link 
        href={actionHref} 
        className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
      >
        {actionLabel}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default AlertCard;