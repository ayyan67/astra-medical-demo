'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface Claim {
  id: string;
  patient: string;
  amount: string;
  status: string;
  daysAgo: number;
}

interface PriorityClaimsCardProps {
  claims: Claim[];
  totalCount?: number; // Total number of claims needing attention
}

const PriorityClaimsCard = ({ claims, totalCount = 8 }: PriorityClaimsCardProps) => {
  // If totalCount is not provided, default to the length of claims plus 5 (simulating additional claims)
  const actualTotalCount = totalCount || claims.length + 5;
  const hasMoreClaims = actualTotalCount > claims.length;
  
  return (
    <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardContent className="p-0">
        <div className="p-6 border-b border-purple-900/30 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              Claims Requiring Attention
              {actualTotalCount > 0 && (
                <span className="ml-3 text-xs px-2.5 py-1 bg-amber-900/40 text-amber-300 rounded-full">
                  {actualTotalCount} total
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-400 mt-1">High priority claims that need your input</p>
          </div>
        </div>
        <div className="divide-y divide-purple-900/30">
          {claims.length > 0 ? (
            claims.map((claim) => (
              <div key={claim.id} className="p-4 hover:bg-purple-900/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white flex items-center">
                      {claim.id}
                      <span className="ml-2 text-xs px-2 py-0.5 bg-orange-900/50 text-orange-300 rounded-full">
                        {claim.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{claim.patient}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{claim.amount}</p>
                    <p className="text-sm text-gray-400 mt-1">{claim.daysAgo} days ago</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link 
                    href={`/claims/review?id=${claim.id}`}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              No claims requiring attention
            </div>
          )}
        </div>
        <div className="p-4 bg-[#0A0A20] border-t border-purple-900/30">
          <Link 
            href="/claims/review" 
            className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center justify-center"
          >
            {hasMoreClaims ? (
              <>
                View All Claims
                <span className="ml-2 text-xs px-2 py-0.5 bg-amber-900/30 text-amber-300 rounded-full">
                  {actualTotalCount - claims.length} more
                </span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                View Full History
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityClaimsCard;