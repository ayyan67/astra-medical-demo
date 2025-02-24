'use client'

import { useState } from 'react'
import { FileUpload } from './FileUpload'
import { ProcessingStatus } from './ProcessingStatus'
import { Download } from './Download'
import { Card, CardContent } from '@/components/ui/card'

type Status = 'idle' | 'uploading' | 'processing' | 'complete' | 'error'

export default function DeidentifySection() {
  const [status, setStatus] = useState<Status>('idle')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    try {
      setStatus('uploading')
      setError(null)

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/deidentify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process file')
      }

      // Get the file
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setStatus('complete')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setStatus('error')
    }
  }

  return (
    <Card className="rounded-lg border-gray-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <FileUpload onUpload={handleFileUpload} disabled={status === 'uploading' || status === 'processing'} />
        
        {(status === 'uploading' || status === 'processing') && (
          <ProcessingStatus status={status} />
        )}
        
        {status === 'complete' && downloadUrl && (
          <Download url={downloadUrl} />
        )}
        
        {status === 'error' && error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}