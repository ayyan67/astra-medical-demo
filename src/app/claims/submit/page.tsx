'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClaimForm from '@/components/claims/ClaimsForm';
import { FileText, HelpCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SubmitClaimPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Submit New Claim</h1>
            </div>
            <p className="text-gray-400">
              Fill in the patient and visit details to submit a new claim
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClaimForm />
          </div>
          
          <div className="space-y-6">
            {/* Help Card */}
            <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full p-2 bg-purple-900/30">
                    <HelpCircle className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Our AI assistant can help you optimize your claims and increase approval rates.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Enter detailed clinical notes for better code accuracy
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Review and select the most appropriate codes
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Double-check all patient information for accuracy
                      </li>
                    </ul>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-4 flex items-center">
                      View full documentation
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Claims */}
            <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <CardContent className="p-0">
                <div className="p-4 border-b border-purple-900/30">
                  <h3 className="font-medium text-white">Recent Claims</h3>
                </div>
                <div className="divide-y divide-purple-900/30">
                  {[
                    { id: '103456', patient: 'John Smith', date: '10/25/24', status: 'Approved' },
                    { id: '204789', patient: 'Sarah Johnson', date: '10/24/24', status: 'Pending' },
                    { id: '305123', patient: 'Michael Chen', date: '10/24/24', status: 'Pending' },
                  ].map((claim) => (
                    <div key={claim.id} className="p-3 hover:bg-purple-900/10 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <FileText className="h-3 w-3 text-purple-400 mr-1.5" />
                            <p className="font-medium text-white text-sm">{claim.id}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{claim.patient}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                            claim.status === 'Approved' 
                              ? 'bg-green-900/40 text-green-300'
                              : 'bg-yellow-900/40 text-yellow-300'
                          }`}>
                            {claim.status}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">{claim.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-[#0A0A20] border-t border-purple-900/30">
                  <Link 
                    href="/claims/history" 
                    className="text-purple-400 hover:text-purple-300 text-xs font-medium flex items-center justify-center"
                  >
                    View All Claims
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}