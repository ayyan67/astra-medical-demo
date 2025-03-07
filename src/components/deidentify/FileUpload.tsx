'use client';

import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export function FileUpload({ onUpload, disabled = false }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors text-center ${
          dragActive 
            ? 'border-purple-500 bg-purple-900/20' 
            : 'border-purple-900/30 hover:border-purple-500/50 bg-[#0A0A20]'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 rounded-full bg-purple-900/30">
            <Upload className="h-6 w-6 text-purple-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white">
              {file ? file.name : 'Drag and drop your file here'}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Supports PDF, DOCX, TXT, CSV, and JSON formats up to 10MB
            </p>
          </div>
          {!file && (
            <button
              disabled={disabled}
              type="button"
              className={`mt-2 px-4 py-2 text-sm rounded-md transition-colors ${
                disabled 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select File
            </button>
          )}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleChange}
            disabled={disabled}
            accept=".pdf,.docx,.txt,.csv,.json"
          />
        </div>
      </div>

      {file && (
        <div className="bg-[#0F0F30] p-4 rounded-md border border-purple-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md bg-purple-900/30">
                <File className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="text-xs text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-purple-900/20"
                onClick={clearFile}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700"
              onClick={clearFile}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
              onClick={handleSubmit}
              disabled={disabled}
            >
              <Upload className="mr-1.5 h-4 w-4" />
              Process File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}