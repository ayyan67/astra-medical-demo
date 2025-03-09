'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface DemoBannerProps {
  isDemoUser?: boolean;
}

const DemoBanner = ({ isDemoUser = true }: DemoBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Add a subtle animation effect
  useEffect(() => {
    // Set a short delay to ensure the animation happens after initial render
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isDemoUser || !isVisible) return null;
  
  return (
    <div 
      className={`bg-gradient-to-r from-amber-900/20 via-purple-900/10 to-amber-900/20 border-b border-amber-900/30 text-white py-2 px-4 relative transition-all duration-500 ${
        isInitialRender ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'gradientMove 5s ease infinite',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <AlertCircle className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-amber-400 rounded-full animate-ping"></span>
          </div>
          <p className="text-sm">
            <span className="font-semibold text-amber-300">Demo Mode:</span>{' '}
            You are viewing a demo with sample data. No real patient information is being displayed.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors ml-2 p-1 rounded-full hover:bg-purple-900/20"
          aria-label="Close demo banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;