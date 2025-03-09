'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { UserCircle, Settings } from 'lucide-react';

export default function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside user menu
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        className="flex items-center space-x-2 p-1 rounded-md text-gray-300 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20]"
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        aria-expanded={userMenuOpen}
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-sm font-bold shadow-md">
          DA
        </div>
        <span className="hidden md:inline text-sm">Dr. Astra</span>
      </button>
      
      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0F0F30] rounded-md shadow-lg border border-purple-900/50 overflow-hidden z-50">
          <div className="p-3 border-b border-purple-900/30">
            <p className="text-sm font-medium text-white">Dr. Astra</p>
            <p className="text-xs text-gray-400">dr.astra@example.com</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Your Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </div>
          <div className="py-1 border-t border-purple-900/30">
            <button
              onClick={() => window.location.href = "/"}
              className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-red-900/10 hover:text-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}