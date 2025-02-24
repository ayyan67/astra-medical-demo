'use client'

import { Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface ProcessingStatusProps {
  status: 'uploading' | 'processing'
}

export function ProcessingStatus({ status }: ProcessingStatusProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="font-medium">
          {status === 'uploading' ? 'Uploading file...' : 'De-identifying data...'}
        </span>
      </div>
      <Progress value={status === 'uploading' ? 33 : 66} className="h-2" />
      <p className="text-sm text-gray-500">
        {status === 'uploading'
          ? 'Your file is being uploaded securely...'
          : 'Removing personal health information...'}
      </p>
    </div>
  )
}