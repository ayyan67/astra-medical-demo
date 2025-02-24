'use client'

import { Shield } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function PrivacyBanner() {
  return (
    <Alert className="bg-blue-50/50 border-blue-100">
      <Shield className="h-5 w-5 text-blue-500" />
      <AlertDescription>
        <h3 className="font-medium text-blue-900 mb-2">HIPAA Compliant De-identification</h3>
        <ul className="grid gap-1.5 text-sm text-blue-700">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Processing is done locally - no data leaves your browser
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Follows HIPAA Safe Harbor de-identification standards
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Removes all 18 types of protected health information (PHI)
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}