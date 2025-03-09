'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SearchOverlay({ isOpen, setIsOpen }: SearchOverlayProps) {
  return (
    <div className="relative">
      {isOpen ? (
        <div className="absolute right-0 top-0 w-64 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#050510] border border-purple-900/50 focus:border-purple-500 text-white h-10 px-4 pr-10 rounded-md placeholder:text-gray-500"
            autoFocus
            aria-label="Search"
          />
          <button 
            className="absolute right-2 text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20]"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}