import React from 'react';
import Navigation from '@/components/layout/Navigation';
import ClaimsTable from '@/components/claims/ClaimsTable';

export default function ClaimsHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Claims History</h1>
        <ClaimsTable />
      </main>
    </div>
  );
}