'use client';

import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface CardWithHeaderProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export default function CardWithHeader({
  title,
  icon: Icon,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
}: CardWithHeaderProps) {
  return (
    <Card className={`overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] ${className}`}>
      <div className={`p-4 sm:p-6 border-b border-purple-900/30 ${headerClassName}`}>
        <div className="flex items-center">
          {Icon && <Icon className="h-5 w-5 text-purple-400 mr-2" />}
          <h2 className="text-lg sm:text-xl font-medium text-white">{title}</h2>
        </div>
      </div>
      <div className={`p-4 sm:p-6 ${contentClassName}`}>
        {children}
      </div>
    </Card>
  );
}