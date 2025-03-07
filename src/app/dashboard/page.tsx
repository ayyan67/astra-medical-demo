"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import YearlyReimbursementsChart from '@/components/dashboard/YearlyReimbursementsChart';
import { 
  Clock, 
  TrendingUp, 
  CalendarCheck, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// Custom components for our dashboard
const StatsCard = ({ title, value, icon: Icon, trend, trendUp, bgColor, loading = false }) => (
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

const AlertCard = ({ type, message, actionLabel = "View", actionHref = "#" }) => {
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
      <IconComponent className={`h-5 w-5 ${type === 'info' ? 'text-blue-400' : type === 'warning' ? 'text-orange-400' : 'text-green-400'}`} />
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

  return (
    <DashboardLayout>
      <div className="mb-8">
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
        
        {/* Alerts/Notifications */}
        <div className="mb-6 space-y-3">
          <AlertCard 
            type="warning" 
            message="3 claims require your attention for additional documentation." 
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Claims that need attention */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-bold text-white">Claims Requiring Attention</h2>
                <p className="text-sm text-gray-400 mt-1">High priority claims that need your input</p>
              </div>
              <div className="divide-y divide-purple-900/30">
                {priorityClaims.map((claim) => (
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
                        href={`/claims/${claim.id}`} 
                        className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[#0A0A20] border-t border-purple-900/30">
                <Link 
                  href="/claims/review" 
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center justify-center"
                >
                  View All Claims
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Yearly Reimbursements Chart */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-bold text-white">Yearly Reimbursements</h2>
                <p className="text-sm text-gray-400 mt-1">Track your payment trends over time</p>
              </div>
              <div className="p-6 bg-[#050510]">
                <YearlyReimbursementsChart />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}