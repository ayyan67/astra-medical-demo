'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './header';
import DemoBanner from '@/components/common/DemoBanner';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isDemoUser?: boolean; // Added prop to conditionally show demo banner
}

export default function DashboardLayout({ 
  children, 
  isDemoUser = true // Default to showing demo banner
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

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
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
        {/* Demo banner - only shown for demo users */}
        <DemoBanner isDemoUser={isDemoUser} />
        
        {/* Top navigation bar */}
        <Header 
          isMobile={isMobile} 
          toggleMobileMenu={toggleMobileMenu} 
          notificationCount={notifications} 
        />
        
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