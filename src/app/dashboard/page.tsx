"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/layout/Navigation';
import ReimbursementChart from '@/components/dashboard/ReimbursementChart';
import ClaimsOverview from '@/components/dashboard/ClaimsOverview';
import { CalendarCheck, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. Astra</h1>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            {
              title: "Average Processing Time",
              value: "3.2 days",
              icon: Clock,
              trend: "-12% from last month",
              trendUp: false
            },
            {
              title: "Claims Success Rate",
              value: "94.8%",
              icon: TrendingUp,
              trend: "+2.4% from last month",
              trendUp: true
            },
            {
              title: "Claims This Month",
              value: "1,247",
              icon: CalendarCheck,
              trend: "+156 from last month",
              trendUp: true
            }
          ].map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className={`text-sm mt-2 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend}
                    </p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="xl:col-span-1">
            <ReimbursementChart />
          </Card>
          <Card className="xl:col-span-1">
            <ClaimsOverview />
          </Card>
        </div>
      </main>
    </div>
  );
}