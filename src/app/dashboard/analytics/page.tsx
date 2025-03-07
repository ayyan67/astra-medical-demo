'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Wallet, TrendingUp, ArrowUpRight, DownloadCloud, Printer, FileBarChart2, Calendar, Percent, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState('year');

  // Mock data for the charts - would be replaced with real data in production
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = [480000, 520000, 510000, 530000, 550000, 540000, 570000, 590000, 580000, 600000, 0, 0];
  const claimsData = [750, 800, 830, 810, 850, 880, 890, 910, 920, 950, 0, 0];
  const reimbursementRateData = [88, 89, 90, 91, 90, 92, 93, 93, 94, 95, 0, 0];

  // Top diagnosis and procedure data
  const topDiagnosisCodes = [
    { code: 'I10', description: 'Essential (primary) hypertension', count: 312, revenue: 28080 },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', count: 186, revenue: 16740 },
    { code: 'J45.909', description: 'Unspecified asthma, uncomplicated', count: 143, revenue: 12870 },
    { code: 'M54.5', description: 'Low back pain', count: 127, revenue: 11430 },
    { code: 'F41.9', description: 'Anxiety disorder, unspecified', count: 98, revenue: 8820 },
  ];
  
  const topProcedureCodes = [
    { code: '99213', description: 'Office/outpatient visit, established patient', count: 574, revenue: 51660 },
    { code: '99214', description: 'Office/outpatient visit, established patient (moderate complexity)', count: 386, revenue: 46320 },
    { code: '99203', description: 'Office/outpatient visit, new patient', count: 128, revenue: 17920 },
    { code: '93000', description: 'Electrocardiogram, routine', count: 93, revenue: 5580 },
    { code: '90471', description: 'Immunization administration', count: 86, revenue: 4300 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Analytics & Reporting</h1>
            </div>
            <p className="text-gray-400 mt-1">
              Track your reimbursements, claim success rates, and revenue trends
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-[#0F0F30] hover:bg-[#191940] text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center border border-purple-900/30">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Export
            </button>
            <button className="bg-[#0F0F30] hover:bg-[#191940] text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center border border-purple-900/30">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </button>
          </div>
        </div>
        
        {/* Time Period Selector */}
        <div className="bg-[#0A0A20] border border-purple-900/30 rounded-lg p-3 mb-6 flex items-center">
          <Calendar className="h-5 w-5 text-purple-400 mr-3" />
          <span className="text-gray-400 mr-4">Time Period:</span>
          <div className="flex bg-[#050510] rounded-md p-1">
            <button 
              onClick={() => setTimePeriod('month')} 
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'month' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setTimePeriod('quarter')} 
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'quarter' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Quarter
            </button>
            <button 
              onClick={() => setTimePeriod('year')} 
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'year' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Year
            </button>
            <button 
              onClick={() => setTimePeriod('custom')} 
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'custom' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Custom
            </button>
          </div>
          <div className="ml-auto flex items-center">
            <Filter className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400 mr-2">Filter:</span>
            <select className="bg-[#0F0F30] border border-purple-900/30 rounded-md text-white px-2 py-1 text-sm focus:border-purple-500 focus:ring focus:ring-purple-500/20">
              <option>All Payers</option>
              <option>Medicare</option>
              <option>Blue Shield</option>
              <option>United Healthcare</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold text-white mt-2">$5.47M</p>
                  <p className="flex items-center text-sm mt-2 text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12.4% from last year
                  </p>
                </div>
                <div className="rounded-full p-3 bg-purple-900/30">
                  <Wallet className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Claims Processed</p>
                  <p className="text-2xl font-bold text-white mt-2">8,740</p>
                  <p className="flex items-center text-sm mt-2 text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8.2% from last year
                  </p>
                </div>
                <div className="rounded-full p-3 bg-blue-900/30">
                  <FileBarChart2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Reimbursement Rate</p>
                  <p className="text-2xl font-bold text-white mt-2">94.8%</p>
                  <p className="flex items-center text-sm mt-2 text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.3% from last year
                  </p>
                </div>
                <div className="rounded-full p-3 bg-green-900/30">
                  <Percent className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-white">Revenue Trend</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors">
                      <TrendingUp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-[300px] relative">
                  {/* Chart visualization would go here - using a placeholder for now */}
                  <div className="absolute inset-x-0 bottom-0 h-[250px] flex items-end justify-between">
                    {revenueData.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-full">
                        <div 
                          className={`relative w-4/5 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm ${value === 0 ? 'opacity-30' : ''}`} 
                          style={{ height: `${value / 6000}px` }}
                        >
                          {index === 9 && (
                            <div className="absolute -right-1 top-0 w-2 h-2 bg-green-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-gray-400">{monthLabels[index]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                    <div>$600K</div>
                    <div>$500K</div>
                    <div>$400K</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Claims Volume */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-white">Claims Volume</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors">
                      <TrendingUp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-[300px] relative">
                  {/* Claims volume chart - using a placeholder for now */}
                  <div className="absolute inset-x-0 bottom-0 h-[250px] flex items-end justify-between">
                    {claimsData.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-full">
                        <div 
                          className={`relative w-4/5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm ${value === 0 ? 'opacity-30' : ''}`} 
                          style={{ height: `${value / 4}px` }}
                        >
                          {index === 9 && (
                            <div className="absolute -right-1 top-0 w-2 h-2 bg-green-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-gray-400">{monthLabels[index]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                    <div>1000</div>
                    <div>750</div>
                    <div>500</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top ICD/CPT Codes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Diagnosis Codes */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-medium text-white">Top Diagnosis Codes (ICD-10)</h2>
              </div>
              <div className="divide-y divide-purple-900/30">
                {topDiagnosisCodes.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-purple-900/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#0F0F30] text-purple-400 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                            {index + 1}
                          </div>
                          <p className="font-medium text-white">{item.code}</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 ml-8">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">${item.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mt-1">{item.count} claims</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Top Procedure Codes */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-medium text-white">Top Procedure Codes (CPT)</h2>
              </div>
              <div className="divide-y divide-purple-900/30">
                {topProcedureCodes.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-purple-900/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#0F0F30] text-blue-400 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                            {index + 1}
                          </div>
                          <p className="font-medium text-white">{item.code}</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 ml-8">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">${item.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mt-1">{item.count} claims</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}