"use client"

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import ClaimForm from '@/components/claims/ClaimsForm';

export default function SubmitClaimPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit a Claim</h1>
        <ClaimForm />
      </main>
    </div>
  );
}