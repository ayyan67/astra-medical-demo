'use client';

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight, LogIn, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

// Animation elements that match the landing page style
const DataFlowAnimation = () => {
  return (
    <div className="absolute -z-10 right-0 top-24 w-full md:w-1/2 h-[300px] opacity-20 overflow-hidden" aria-hidden="true">
      <div className="animate-pulse absolute top-1/4 right-1/3 w-24 h-24 rounded-full border-2 border-purple-500/30"></div>
      <div className="animate-pulse absolute top-1/2 right-1/4 w-16 h-16 rounded-full border border-purple-400/40 delay-300"></div>
      <div className="animate-pulse absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full border border-purple-600/20 delay-500"></div>
      
      <div className="data-flow">
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              right: `${10 + i * 8}%`,
              width: `${100 + i * 20}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Add fade-in animation when component mounts
    setFadeIn(true);
    
    // Add class to respect reduced motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate login - replace with actual authentication
      if (formData.username && formData.password) {
        // In a production environment, you'd use NextAuth or similar
        // const result = await signIn("credentials", {
        //   redirect: false,
        //   username: formData.username,
        //   password: formData.password,
        // });
        
        // Simulating successful login
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError("Please enter both email and password");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans flex flex-col overflow-hidden">
      {/* Skip to main content link for keyboard users */}
      <a href="#login-form" className="skip-link">Skip to login form</a>
      
      {/* Background with gradient */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: 'radial-gradient(circle at 50% 30%, #0a0a20 0%, #050510 100%)',
        }}
        aria-hidden="true"
      />
      
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center group" aria-label="Astra Medical Home">
          <div className="mr-3 relative">
            <Image src="/astra-logo.png" alt="" width={32} height={32} />
            <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true"></div>
          </div>
          <span className="text-white font-bold text-xl tracking-tight group-hover:text-purple-200 transition-colors duration-300">ASTRA MEDICAL</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="text-white hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] rounded-md px-2 py-1">
            Contact
          </Link>
        </div>
      </nav>
      
      {/* Main content */}
      <main id="login-form" className={`flex-grow flex items-center justify-center px-4 py-12 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md z-10 relative">
          {/* Animation effects */}
          <DataFlowAnimation />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Welcome Back</h1>
            <p className="text-gray-300">Log in to your Astra Medical account</p>
          </div>
          
          <div className="bg-[#0A0A20] p-6 md:p-8 rounded-xl border border-purple-900/30 hover:border-purple-800/70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.1)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-white text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@practice.com"
                    className="w-full bg-[#050510] border-purple-900/50 focus:border-purple-500 text-white h-11 px-4 rounded-md placeholder:text-gray-500"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-[#050510] border-purple-900/50 focus:border-purple-500 text-white h-11 px-4 rounded-md placeholder:text-gray-500"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 px-4 rounded-md font-semibold transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>Sign in</span>
                  </div>
                )}
              </button>
              
              <div className="mt-4 pt-4 border-t border-purple-900/30 text-center">
                <p className="text-gray-400 text-sm">
                  Don&#39;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
          
          {/* Security callout */}
          <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
            <Shield className="w-4 h-4 mr-2 text-purple-500" aria-hidden="true" />
            <span>HIPAA compliant, secure login</span>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#050510] border-t border-purple-900/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Astra Medical. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
