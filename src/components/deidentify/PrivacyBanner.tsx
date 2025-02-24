'use client'

import { Shield } from 'lucide-react'

export function PrivacyBanner() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-900 mb-2">HIPAA Compliant De-identification</h3>
          <ul className="grid gap-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Processing is done locally - no data leaves your browser</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Follows HIPAA Safe Harbor de-identification standards</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Removes all 18 types of protected health information (PHI)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}