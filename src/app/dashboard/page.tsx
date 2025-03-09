"use client";

import React, { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Clock, TrendingUp, CalendarCheck, ArrowUpRight, ChevronRight } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import AlertCard from '@/components/dashboard/AlertCard';
import PriorityClaimsCardLoading from '@/components/dashboard/PriorityClaimsCardLoading';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Dynamically import the chart component
const YearlyReimbursementsChart = dynamic(
  () => import('@/components/dashboard/YearlyReimbursementsChart'),
  {
    ssr: false, // Disable SSR for Recharts which requires browser APIs
    loading: () => (
      <div className="h-[300px] w-full bg-[#050510] flex items-center justify-center">
        <div className="h-[240px] w-[90%] bg-[#0A0A20] rounded-md animate-pulse"></div>
      </div>
    )
  }
);

// Lazy load the PriorityClaimsCard component
const PriorityClaimsCard = lazy(() => 
  // Add artificial delay to simulate network latency in development
  new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    // In production, remove the timeout
    setTimeout(() => {
      resolve(import('@/components/dashboard/PriorityClaimsCard'));
    }, process.env.NODE_ENV === 'development' ? 1000 : 0);
  })
);

export default function DashboardPage() {
  // You would fetch this data from an API in a real app
  const stats = [
    {
      title: "Average Processing Time",
      value: "3.2 days",
      icon: Clock,
      trend: "12% from last month",
      trendUp: false,
      bgColor: "bg-purple-900/30",
    },
    {
      title: "Claims Success Rate",
      value: "94.8%",
      icon: TrendingUp,
      trend: "2.4% from last month",
      trendUp: true,
      bgColor: "bg-purple-900/30",
    },
    {
      title: "Claims This Month",
      value: "1,247",
      icon: CalendarCheck,
      trend: "156 from last month",
      trendUp: true,
      bgColor: "bg-purple-900/30",
    },
  ];

  // Priority claims that need attention
  const priorityClaims = [
    { id: "CL-9876", patient: "Emma Thompson", amount: "$1,250.00", status: "Pending Documentation", daysAgo: 2 },
    { id: "CL-9421", patient: "Michael Chen", amount: "$3,450.00", status: "Requires Review", daysAgo: 1 },
    { id: "CL-8732", patient: "Sarah Johnson", amount: "$780.00", status: "Denied - Resubmit", daysAgo: 3 },
  ];
  
  // Total claims that need attention (in a real app, this would come from an API)
  const totalClaimsNeedingAttention = 8;

  return (
    <DashboardLayout>
      <div className="mb-8">
        {/* Critical content loads immediately */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, Dr. Astra</h1>
            <p className="text-gray-400 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/claims/submit">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center">
                Submit New Claim
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
        
        {/* Alerts/Notifications - Important info loads immediately */}
        <div className="mb-6 space-y-3">
          <AlertCard 
            type="warning" 
            message={`${totalClaimsNeedingAttention} claims require your attention for additional documentation.`}
            actionLabel="Review Claims"
            actionHref="/claims/review" 
          />
          <AlertCard 
            type="info" 
            message="New ICD-10 codes have been released for 2025. Click to view updates." 
            actionLabel="View Updates"
            actionHref="/updates/icd" 
          />
        </div>

        {/* Quick Stats - Key metrics load immediately */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        
        {/* Main content grid - Less critical content loads with staggered approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Claims that need attention - Loaded after critical content */}
          <Suspense fallback={<PriorityClaimsCardLoading />}>
            <PriorityClaimsCard 
              claims={priorityClaims} 
              totalCount={totalClaimsNeedingAttention} 
            />
          </Suspense>
          
          {/* Yearly Reimbursements Chart - Also loaded after critical content */}
          <div className="card overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] bg-[#0A0A20] rounded-lg border border-[#1F1F3D]">
            <div className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-bold text-white">Yearly Reimbursements</h2>
                <p className="text-sm text-gray-400 mt-1">Track your payment trends over time</p>
              </div>
              <div className="p-6 bg-[#050510]">
                <Suspense fallback={
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="h-[240px] w-full bg-[#0A0A20]/50 rounded-md animate-pulse"></div>
                  </div>
                }>
                  <YearlyReimbursementsChart />
                </Suspense>
              </div>
              <div className="p-4 bg-[#0A0A20] border-t border-purple-900/30">
                <Link 
                  href="/dashboard/analytics" 
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center justify-center"
                >
                  View Detailed Analytics
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}