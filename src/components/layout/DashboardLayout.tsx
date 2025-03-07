'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, Bell, Search, X, UserCircle, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const [prefersDarkMode, setPrefersDarkMode] = useState(true);

  // User menu reference for clicks outside
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Handle clicks outside user menu
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#050510] flex overflow-hidden">
      {/* Gradient background */}
      <div 
        className="fixed inset-0 -z-10 opacity-30" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0a0a25 0%, #050510 100%)',
        }}
        aria-hidden="true"
      />
      
      {/* Mobile sidebar overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-all transform duration-300 lg:relative lg:transform-none",
          isMobile && !mobileMenuOpen ? "-translate-x-full" : "translate-x-0",
          "lg:block"
        )}
      >
        <Sidebar 
          collapsed={sidebarCollapsed && !isMobile} 
          toggleCollapse={!isMobile ? toggleSidebar : undefined} 
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
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
              
              {/* Breadcrumbs could go here */}
              <div className="hidden md:flex ml-4 items-center space-x-2 text-sm text-gray-400">
                <Link href="/dashboard" className="hover:text-purple-300 transition-colors">Dashboard</Link>
                {/* Add dynamic breadcrumbs based on route */}
              </div>
            </div>
            
            {/* Right section: Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
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
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20]"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Notifications */}
              <button 
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20] relative"
                aria-label={`${notifications} notifications`}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-purple-600 rounded-full text-[10px] flex items-center justify-center text-white">
                    {notifications}
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
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-[#050510] text-white relative">
          <div className={cn(
            "container mx-auto px-4 py-6",
            sidebarCollapsed ? "lg:px-6" : "lg:px-4"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}