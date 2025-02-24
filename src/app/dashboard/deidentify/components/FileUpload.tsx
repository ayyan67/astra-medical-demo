'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FileUploadProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

export function FileUpload({ onUpload, disabled }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'application/xml': ['.xml', '.ccd'],
    },
    maxFiles: 1,
    disabled,
  })

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-blue-50">
            <Upload className="h-6 w-6 text-blue-500" />
          </div>
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600">Drop your file here</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-900">
                Drag & drop your file here
              </p>
              <p className="text-sm text-gray-500">
                or click to browse
              </p>
            </>
          )}
          <p className="text-xs text-gray-400">
            Supports Excel (.xlsx), CSV, and CCD/XML files
          </p>
        </div>
      </div>

      {selectedFile && (
        <Alert className="bg-blue-50 border-blue-100">
          <FileIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium text-blue-900">{selectedFile.name}</span>
            <div className="flex gap-2">
              <Button 
                onClick={handleUpload} 
                disabled={disabled}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Process File
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={clearSelection}
                className="border-gray-200 hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}