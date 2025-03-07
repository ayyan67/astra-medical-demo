'use client';

import { CheckCircle2, Download as DownloadIcon } from 'lucide-react';

interface DownloadProps {
  url: string;
}

export function Download({ url }: DownloadProps) {
  return (
    <div className="rounded-md border border-green-900/30 p-4 bg-green-900/10">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-green-400">Processing Complete</h3>
          <p className="mt-1 text-sm text-gray-300">
            Your file has been successfully de-identified. All personal health information has been removed.
          </p>
          <div className="mt-3 flex space-x-2">
            <a
              href={url}
              download="deidentified-file"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <DownloadIcon className="mr-1.5 h-4 w-4" />
              Download File
            </a>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-[#0F0F30] text-white hover:bg-[#191940] transition-colors border border-purple-900/30"
            >
              Process Another File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}