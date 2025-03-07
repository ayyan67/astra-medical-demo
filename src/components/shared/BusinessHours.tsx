'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export interface ScheduleEntry {
  days: string;
  hours: string;
}

interface BusinessHoursProps {
  className?: string;
  schedule?: ScheduleEntry[];
}

const defaultSchedule: ScheduleEntry[] = [
  { days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM ET' },
  { days: 'Saturday', hours: '9:00 AM - 2:00 PM ET' },
  { days: 'Sunday', hours: 'Closed' },
];

export default function BusinessHours({ className, schedule = defaultSchedule }: BusinessHoursProps) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-start">
        <Clock className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-400">
          Customer support is available during the following hours:
        </p>
      </div>
      <div className="space-y-2 pl-8">
        {schedule.map((entry, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-sm text-gray-400">{entry.days}:</span>
            <span className="text-sm text-white">{entry.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}