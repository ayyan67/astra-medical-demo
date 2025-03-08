'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export interface ContactInfoItem {
  type: 'email' | 'phone' | 'address' | 'website';
  value: string;
  href?: string;
  secondLine?: string;
}

interface ContactInfoProps {
  className?: string;
  items?: ContactInfoItem[];
}

const defaultContactInfo: ContactInfoItem[] = [
  {
    type: 'email',
    value: 'ayyan@astramedical.co',
    href: 'mailto:ayyan@astramedical.co',
  },
  {
    type: 'phone',
    value: '+1 (908) 315-2084',
    href: 'tel:+19083152084',
  },
  {
    type: 'address',
    value: '2680 N Santiago Blvd Suite 200',
    secondLine: 'Orange, CA 92867',
  },
  {
    type: 'website',
    value: 'astramedical.co',
    href: 'https://astramedical.co',
  },
];

export default function ContactInfo({ className, items = defaultContactInfo }: ContactInfoProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />;
      case 'address':
        return <MapPin className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />;
      case 'website':
        return <Globe className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-start">
          {getIcon(item.type)}
          <div>
            <p className="text-sm font-medium text-white capitalize">{item.type}</p>
            {item.href ? (
              <a
                href={item.href}
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                target={item.type === 'website' ? '_blank' : undefined}
                rel={item.type === 'website' ? 'noopener noreferrer' : undefined}
              >
                {item.value}
              </a>
            ) : (
              <p className="text-sm text-gray-400">
                {item.value}
                {item.secondLine && (
                  <>
                    <br />
                    {item.secondLine}
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}