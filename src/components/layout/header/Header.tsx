'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, Search, HelpCircle } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import UserMenu from './UserMenu';

interface HeaderProps {
  isMobile: boolean;
  toggleMobileMenu: () => void;
  notificationCount: number;
}

export default function Header({
  isMobile,
  toggleMobileMenu,
  notificationCount
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-[#0A0A20]/80 backdrop-blur-sm border-b border-purple-900/30 sticky top-0 z-40">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left section: Mobile menu button and breadcrumbs */}
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20]"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          
          {/* Breadcrumbs */}
          <div className="hidden md:flex ml-4 items-center space-x-2 text-sm text-gray-400">
            <Link href="/dashboard" className="hover:text-purple-300 transition-colors">Dashboard</Link>
            {/* Add dynamic breadcrumbs based on route */}
          </div>
        </div>
        
        {/* Right section: Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <SearchOverlay isOpen={searchOpen} setIsOpen={setSearchOpen} />
          
          {/* Notifications */}
          <button 
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20] relative"
            aria-label={`${notificationCount} notifications`}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-purple-600 rounded-full text-[10px] flex items-center justify-center text-white">
                {notificationCount}
              </span>
            )}
          </button>
          
          {/* Help */}
          <button 
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20]"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          
          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}