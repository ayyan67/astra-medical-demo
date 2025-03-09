'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function PriorityClaimsCardLoading() {
  return (
    <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardContent className="p-0">
        <div className="p-6 border-b border-purple-900/30 flex justify-between">
          <div>
            <div className="flex items-center">
              <div className="h-7 w-48 bg-[#0F0F30] rounded-md animate-pulse"></div>
              <div className="h-5 w-16 ml-3 bg-[#0F0F30] rounded-full animate-pulse"></div>
            </div>
            <div className="h-4 w-64 bg-[#0F0F30] rounded-md animate-pulse mt-2"></div>
          </div>
        </div>
        <div className="divide-y divide-purple-900/30">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <div className="h-5 w-20 bg-[#0F0F30] rounded-md animate-pulse"></div>
                    <div className="h-4 w-24 ml-2 bg-[#0F0F30] rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-4 w-40 bg-[#0F0F30] rounded-md animate-pulse mt-2"></div>
                </div>
                <div className="text-right">
                  <div className="h-5 w-20 bg-[#0F0F30] rounded-md animate-pulse"></div>
                  <div className="h-4 w-16 bg-[#0F0F30] rounded-md animate-pulse mt-2"></div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <div className="h-5 w-24 bg-[#0F0F30] rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-[#0A0A20] border-t border-purple-900/30 flex justify-center items-center">
          <div className="h-5 w-28 bg-[#0F0F30] rounded-md animate-pulse"></div>
          <div className="h-5 w-16 ml-2 bg-[#0F0F30] rounded-full animate-pulse"></div>
          <div className="h-5 w-4 ml-2 bg-[#0F0F30] rounded-md animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}