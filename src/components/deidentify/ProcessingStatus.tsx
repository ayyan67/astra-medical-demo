'use client';

import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
  status: 'uploading' | 'processing';
}

export function ProcessingStatus({ status }: ProcessingStatusProps) {
  return (
    <div className="rounded-md border border-purple-900/30 p-4 bg-[#0F0F30]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">
            {status === 'uploading' ? 'Uploading...' : 'Processing...'}
          </span>
          <span className="text-xs text-gray-400">
            {status === 'uploading' ? '50%' : '75%'}
          </span>
        </div>
        <Progress
          value={status === 'uploading' ? 50 : 75}
          className="h-1.5 bg-purple-900/30"
          indicatorClassName="bg-purple-600"
        />
        <p className="mt-2 text-xs text-gray-400">
          {status === 'uploading'
            ? 'Uploading your file to our secure server...'
            : 'Analyzing and removing personal health information...'}
        </p>
      </div>
    </div>
  );
}