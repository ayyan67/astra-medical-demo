'use client'

import { Download as DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface DownloadProps {
  url: string
}

export function Download({ url }: DownloadProps) {
  return (
    <div className="space-y-4">
      <Alert className="border-green-500 bg-green-50">
        <AlertDescription>
          <h3 className="font-medium text-green-800 mb-1">Processing Complete!</h3>
          <p className="text-green-700">Your de-identified file is ready for download.</p>
        </AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button onClick={() => window.location.href = url} className="gap-2 bg-blue-500 hover:bg-blue-600">
          <DownloadIcon className="h-4 w-4" />
          Download De-identified File
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500">
        The file will be automatically deleted after download for security
      </p>
    </div>
  )
}