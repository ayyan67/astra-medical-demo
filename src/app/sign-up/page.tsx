'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { User, ArrowRight, CheckCircle, Shield } from "lucide-react";

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

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Add fade-in animation when component mounts
    setFadeIn(true);
    
    // Add class to respect reduced motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // In a real app, this would connect to your sign-up API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to login page
      router.push('/login');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans flex flex-col overflow-hidden">
      {/* Skip to main content link for keyboard users */}
      <a href="#signup-form" className="skip-link">Skip to signup form</a>
      
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
          <Link href="/login" className="text-white hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] rounded-md px-4 py-2 border border-purple-600 hover:bg-purple-900/20">
            Log In
          </Link>
        </div>
      </nav>
      
      {/* Main content */}
      <main id="signup-form" className={`flex-grow flex items-center justify-center px-4 py-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md z-10 relative">
          {/* Animation effects */}
          <DataFlowAnimation />
          
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Get Started</h1>
            <p className="text-gray-300">Create your Astra Medical account</p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-white text-sm font-medium">First Name</label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      className="w-full"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-white text-sm font-medium">Last Name</label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="w-full"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-white text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="yourname@practice.com"
                    className="w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-white text-sm font-medium">Confirm Password</label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
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
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>Create Account</span>
                    </div>
                  )}
                </button>
                
                <div className="pt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Benefits list */}
          <div className="mt-6 bg-[#0A0A20]/70 p-4 rounded-lg border border-purple-900/30">
            <h3 className="text-purple-400 font-semibold mb-3 text-sm">Your Astra Medical account includes:</h3>
            <ul className="space-y-2">
              {[
                "24/7 access to your billing dashboard",
                "Real-time claim status updates",
                "Detailed revenue analytics",
                "HIPAA-compliant secure portal"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Security callout */}
          <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
            <Shield className="w-4 h-4 mr-2 text-purple-500" aria-hidden="true" />
            <span>HIPAA compliant, secure account creation</span>
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