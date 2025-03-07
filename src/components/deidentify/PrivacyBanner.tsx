'use client';

import { AlertCircle } from 'lucide-react';

export function PrivacyBanner() {
  return (
    <div className="flex items-start rounded-lg p-4 border border-purple-900/30 bg-purple-900/10">
      <AlertCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-white">Privacy Protection</h3>
        <p className="mt-1 text-sm text-gray-300">
          All de-identification is performed locally in your browser. Your data is never uploaded to our servers unless you 
          explicitly request cloud processing. We adhere to HIPAA guidelines to ensure your data remains protected.
        </p>
      </div>
    </div>
  );
}