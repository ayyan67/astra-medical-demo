'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PrivacyBanner } from "@/components/deidentify/PrivacyBanner";
import { DeidentifySection } from "@/components/deidentify/DeidentifySection";
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, ArrowLeft, Info, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DeidentifyPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-white">De-identify Medical Data</h1>
            </div>
            <p className="text-gray-400 mt-1">
              Remove personal health information (PHI) from your medical files securely
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Main De-identify Card */}
            <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <CardContent className="p-0">
                <div className="p-6 border-b border-purple-900/30 flex items-center">
                  <ShieldCheck className="h-5 w-5 text-purple-400 mr-2" />
                  <h2 className="text-xl font-medium text-white">De-identify Files</h2>
                </div>
                <div className="p-6">
                  <PrivacyBanner />
                  <div className="mt-6">
                    <DeidentifySection />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Card */}
            <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full p-2 bg-blue-900/30">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2">How it works</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Our advanced AI processes your medical documents and removes all 18 HIPAA-defined identifiers while preserving the clinical value of the data.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Names, addresses, dates, and contact information are removed
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Medical record numbers and device identifiers are obfuscated
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        All files are processed locally and never stored on our servers
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* HIPAA Compliance Card */}
            <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <CardContent className="p-0">
                <div className="p-4 border-b border-purple-900/30">
                  <h3 className="font-medium text-white">HIPAA Compliance</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-4">
                    <ShieldCheck className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-400">
                      Our de-identification process follows the HIPAA Safe Harbor method, removing all 18 protected health information identifiers.
                    </p>
                  </div>
                  <div className="bg-[#0F0F30] rounded-md p-3 mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-300">
                        Always verify de-identified files before sharing or using for research purposes to ensure no PHI remains.
                      </p>
                    </div>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                    Learn more about HIPAA compliance
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Files Card */}
            <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <CardContent className="p-0">
                <div className="p-4 border-b border-purple-900/30">
                  <h3 className="font-medium text-white">Recently De-identified</h3>
                </div>
                <div className="divide-y divide-purple-900/30">
                  {[
                    { name: 'patient_records_10-25.pdf', date: '10/25/24', size: '1.2 MB' },
                    { name: 'clinical_notes_q3.docx', date: '10/23/24', size: '850 KB' },
                    { name: 'medical_history.csv', date: '10/20/24', size: '450 KB' },
                  ].map((file, index) => (
                    <div key={index} className="p-3 hover:bg-purple-900/10 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <FileText className="h-3 w-3 text-purple-400 mr-1.5" />
                            <p className="font-medium text-white text-sm">{file.name}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 ml-5">{file.date}</p>
                        </div>
                        <p className="text-xs text-gray-400">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-[#0A0A20] border-t border-purple-900/30">
                  <button className="text-purple-400 hover:text-purple-300 text-xs font-medium flex items-center justify-center w-full">
                    View All Files
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}