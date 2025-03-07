'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Clock, PieChart, DollarSign, ChevronRight, FileText, Users, Activity, Shield, Star, ArrowUpRight, Lock, CheckCircle2, ListChecks, Building2, Laptop } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

// Animation component for the hero section
const DataFlowAnimation = () => {
  return (
    <div className="absolute -z-10 right-0 top-24 w-full md:w-1/2 h-[300px] opacity-20 overflow-hidden" aria-hidden="true">
      <div className="animate-pulse absolute top-1/4 right-1/3 w-24 h-24 rounded-full border-2 border-purple-500/30"></div>
      <div className="animate-pulse absolute top-1/2 right-1/4 w-16 h-16 rounded-full border border-purple-400/40 delay-300"></div>
      <div className="animate-pulse absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full border border-purple-600/20 delay-500"></div>
      
      <div className="data-flow">
        {Array.from({ length: 6 }).map((_, i) => (
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

// Intersection Observer Hook for scroll animations
function useIntersectionObserver(options = {}): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [ref, isVisible];
}

// Animated Section component
type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const AnimatedSection = ({ children, className = "" }: AnimatedSectionProps) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  // For the ROI Calculator
  const [practiceSize, setPracticeSize] = useState(5);
  const [claimsPerMonth, setClaimsPerMonth] = useState(500);
  
  // Calculate estimated savings
  const calculateSavings = () => {
    const monthlyClaimRevenue = claimsPerMonth * 95; // $95 per claim average
    const currentAcceptanceRate = 0.7; // 70% acceptance rate
    const astraAcceptanceRate = 0.92; // 92% with Astra
    const currentRevenue = monthlyClaimRevenue * currentAcceptanceRate;
    const astraRevenue = monthlyClaimRevenue * astraAcceptanceRate;
    const monthlySavings = astraRevenue - currentRevenue;
    const yearlySavings = monthlySavings * 12;
    
    return {
      monthly: Math.round(monthlySavings),
      yearly: Math.round(yearlySavings)
    };
  };
  
  const savings = calculateSavings();

  useEffect(() => {
    // Add class to respect reduced motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Improved background with reduced complexity for better performance */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0a0a20 0%, #050510 100%)',
        }}
        aria-hidden="true"
      />
      
      {/* Navbar - Improved for better accessibility and mobile optimization */}
      <nav className="container mx-auto px-4 lg:px-6 py-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group" aria-label="Astra Medical Home">
            <div className="mr-3 relative">
              <Image src="/astra-logo.png" alt="" width={32} height={32} />
              <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true"></div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight group-hover:text-purple-200 transition-colors duration-300">ASTRA MEDICAL</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/contact" className="text-white hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] rounded-md px-2 py-1">
            Contact
          </Link>
          <Link href="/login">
            <button className="bg-transparent border border-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-900/20 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] transition duration-300">
              Log In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - Improved with visualization */}
      <header id="main-content" className="container mx-auto px-4 lg:px-6 py-16 md:py-20 lg:py-24 relative">
        {/* Purple accent line */}
        <div className="absolute top-16 md:top-20 lg:top-24 left-0 w-1 h-24 bg-purple-600" aria-hidden="true"></div>
        
        {/* Data flow animation */}
        <DataFlowAnimation />
        
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Astra <span className="text-purple-500">Medical</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
            Increase Revenue by 30% with AI Medical Billing
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Our AI automates medical coding with 95% accuracy, reducing denials and filing claims in under 10 minutes. No more manual billing frustrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/sign-up">
              <button className="btn-primary group">
                Start Saving Revenue Now 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} aria-hidden="true" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-secondary hover:bg-purple-900/20 group">
                See Your Practice's Potential
                <ArrowUpRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} aria-hidden="true" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Announcement Bar - Improved contrast and accessibility */}
      <div className="bg-[#0A0A20] border-y border-purple-900/30 mb-16">
        <div className="container mx-auto px-4 lg:px-6 py-3 flex flex-row justify-between items-center">
          <div className="flex items-center flex-wrap">
            <span className="font-semibold mr-2 text-purple-300">New:</span>
            <span className="text-gray-200">Astra Medical now integrates with 95% of EHR systems.</span>
            <Link 
              href="#" 
              className="ml-2 text-purple-400 hover:text-purple-300 focus:outline-none focus:underline group"
              aria-label="Learn more about EHR integration"
            >
              Learn more
              <ChevronRight size={14} className="inline ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
          <Link 
            href="#" 
            className="hidden md:flex focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A20] rounded-md"
            aria-label="View details about EHR integration"
          >
            <button className="bg-transparent border border-purple-600 text-white px-3 py-1 rounded-md flex items-center hover:bg-purple-900/20 hover:border-purple-400 transition duration-300">
              <span className="text-xs font-medium">View Details</span>
              <ChevronRight size={16} className="ml-1" aria-hidden="true" />
            </button>
          </Link>
        </div>
      </div>

      {/* Problem Statement Section - Improved card layout and contrast */}
      <AnimatedSection>
        <section className="py-16" aria-labelledby="billing-problem">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-purple-500 text-lg font-medium pb-3">
              THE BILLING PROBLEM
            </div>
            <h2 id="billing-problem" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">
              Doctors Are Overwhelmed
            </h2>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
            <Clock className="w-10 h-10 text-purple-500 mb-4 group-hover:text-purple-400 transition-colors" aria-hidden="true" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">25%</h3>
            <p className="text-gray-300 group-hover:text-white transition-all">
            Time spent on administrative tasks instead of patient care
            </p>
              <p className="mt-2 text-sm text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><strong>Solution:</strong> Astra reduces admin time by 80%</p>
            </div>

            <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
            <PieChart className="w-10 h-10 text-purple-500 mb-4 group-hover:text-purple-400 transition-colors" aria-hidden="true" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">62%</h3>
            <p className="text-gray-300 group-hover:text-white transition-all">
              Providers experience burnout due to administrative burden
              </p>
              <p className="mt-2 text-sm text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><strong>Solution:</strong> Automated coding eliminates tedious paperwork</p>
            </div>

            <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
            <DollarSign className="w-10 h-10 text-purple-500 mb-4 group-hover:text-purple-400 transition-colors" aria-hidden="true" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">30%</h3>
            <p className="text-gray-300 group-hover:text-white transition-all">
                Of all claims are denied, causing significant revenue loss
              </p>
              <p className="mt-2 text-sm text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><strong>Solution:</strong> Our AI reduces denials by 85%</p>
            </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How it Works Section - NEW */}
      <AnimatedSection>
        <section className="py-16 bg-[#080818]" aria-labelledby="how-it-works">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-purple-500 text-lg font-medium pb-3">
              HOW IT WORKS
            </div>
            <div className="max-w-3xl mb-12">
              <h2 id="how-it-works" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Simple Process, Powerful Results
              </h2>
              <p className="text-gray-300">Our streamlined workflow integrates seamlessly with your practice</p>
            </div>

            <div className="relative">
              {/* Connection line for desktop view only */}
              <div className="hidden md:block absolute left-1/2 top-24 w-full h-1 bg-gradient-to-r from-purple-600/80 to-purple-800/30" aria-hidden="true"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
                {/* Step 1 */}
                <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 relative hover:border-purple-500/70 transition duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.12)]">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#080818] z-10 shadow-lg">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Connect Your EHR</h3>
                    <p className="text-gray-300">Integrate Astra AI with your existing electronic health record system with one-click setup</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 relative hover:border-purple-500/70 transition duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.12)]">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#080818] z-10 shadow-lg">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-3">AI Processes Notes</h3>
                    <p className="text-gray-300">Our AI automatically extracts ICD and CPT codes from your clinical notes with 95% accuracy</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 relative hover:border-purple-500/70 transition duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.12)]">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#080818] z-10 shadow-lg">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Claims Auto-Submit</h3>
                    <p className="text-gray-300">Claims are automatically formatted, verified and submitted to insurance, with real-time status tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Process Visualization */}
      <AnimatedSection>
        <section className="py-16" aria-labelledby="billing-process">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-purple-500 text-lg font-medium pb-3">
                  THE CURRENT PROCESS
                </div>
                <h2 id="billing-process" className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Traditional Medical Billing is Inefficient
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-900/20 p-2 rounded-full" aria-hidden="true">
                      <span className="text-purple-400 font-semibold">1</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">Doctor Takes Notes</h3>
                      <p className="text-gray-300">Time-consuming documentation during patient visits</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-900/20 p-2 rounded-full" aria-hidden="true">
                      <span className="text-purple-400 font-semibold">2</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">Manual Coding</h3>
                      <p className="text-gray-300">Doctor/third-party matches medical script to ICD/CPT codes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-900/20 p-2 rounded-full" aria-hidden="true">
                      <span className="text-purple-400 font-semibold">3</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">Manual Bill Formatting</h3>
                      <p className="text-gray-300">Coder manually formats bill and cross-checks patient info</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-900/20 p-2 rounded-full" aria-hidden="true">
                      <span className="text-purple-400 font-semibold">4</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">Claim Submission</h3>
                      <p className="text-gray-300">Claim sent to clearinghouse then insurance with delays</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0A0A20] p-6 md:p-8 rounded-xl border border-purple-900/30 hover:border-purple-800/70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.1)]">
                <h3 className="text-2xl font-bold text-center mb-6 text-purple-500">Astra's Solution</h3>
                <div className="flex items-center justify-center">
                  <div className="relative p-px rounded-xl bg-gradient-to-r from-purple-500 to-purple-800 w-full">
                    <div className="px-5 py-6 md:px-6 md:py-8 bg-[#050510] rounded-xl relative z-10">
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-purple-500 p-2 rounded-full">
                            <FileText className="w-4 h-4 text-black" aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <p className="text-white">Doctor takes notes</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center" aria-hidden="true">
                          <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-purple-800"></div>
                        </div>
                        <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-900/30 transition-colors duration-300 group">
                          <h4 className="text-xl font-semibold text-center text-white mb-2 group-hover:text-purple-300 transition-colors">Astra AI</h4>
                          <p className="text-gray-200 text-center text-sm">Automated coding, verification, and claim preparation</p>
                        </div>
                        <div className="flex items-center justify-center" aria-hidden="true">
                          <div className="w-px h-8 bg-gradient-to-b from-purple-800 to-purple-500"></div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-purple-500 p-2 rounded-full">
                            <DollarSign className="w-4 h-4 text-black" aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <p className="text-white">Claim sent to insurance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ROI Calculator - NEW */}
      <AnimatedSection>
        <section className="py-16 bg-[#080818]" aria-labelledby="roi-calculator">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-purple-500 text-lg font-medium pb-3">
                  ROI CALCULATOR
                </div>
                <h2 id="roi-calculator" className="text-3xl font-bold text-white mb-4">
                  Calculate Your Potential Savings
                </h2>
                <p className="text-gray-300 mb-6">
                  See how much revenue you could reclaim by reducing claim denials and optimizing your billing process.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="practice-size" className="block text-white mb-2">Practice Size (Providers)</label>
                    <input 
                      type="range" 
                      id="practice-size" 
                      min="1" 
                      max="50" 
                      value={practiceSize} 
                      onChange={(e) => setPracticeSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>1</span>
                      <span>{practiceSize}</span>
                      <span>50</span>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="claims-per-month" className="block text-white mb-2">Claims Per Month</label>
                    <input 
                      type="range" 
                      id="claims-per-month" 
                      min="100" 
                      max="5000" 
                      step="100"
                      value={claimsPerMonth} 
                      onChange={(e) => setClaimsPerMonth(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>100</span>
                      <span>{claimsPerMonth}</span>
                      <span>5000</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50">
                <h3 className="text-2xl font-bold text-purple-500 mb-6 text-center">Your Potential Savings</h3>
                
                <div className="space-y-6">
                  <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-900/50">
                    <p className="text-gray-300 mb-1">Monthly Revenue Increase</p>
                    <div className="text-4xl font-bold text-white">
                      ${savings.monthly.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
                    <p className="text-gray-300 mb-1">Annual Revenue Increase</p>
                    <div className="text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300">
                      ${savings.yearly.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Link href="/contact">
                      <button className="btn-primary w-full group">
                        Get Your Detailed ROI Analysis
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} aria-hidden="true" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Solution Section - Improved layout and feature cards */}
      <AnimatedSection>
        <section className="py-16" aria-labelledby="solution-title">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-purple-500 text-lg font-medium pb-3">
              OUR SOLUTION
            </div>
            <div className="max-w-3xl mb-12">
              <h2 id="solution-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Streamlined Medical Billing with Astra AI
              </h2>
              <p className="text-gray-200 text-lg">
                Transform your medical practice with our intelligent automation platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Activity className="w-5 h-5" />,
                  title: "Automated Coding",
                  description: "AI-powered ICD/CPT code matching with 95% accuracy"
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: "Quick Submission",
                  description: "Submit claims in under 10 minutes with automated verification"
                },
                {
                  icon: <FileText className="w-5 h-5" />,
                  title: "Real-time Tracking",
                  description: "Monitor claim status and get instant updates"
                },
                {
                  icon: <DollarSign className="w-5 h-5" />,
                  title: "Revenue Optimization",
                  description: "Reduce claim denials and maximize reimbursements"
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Compliance Assurance",
                  description: "Stay compliant with automatic updates and checks"
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "24/7 Support",
                  description: "Get help whenever you need it from our expert team"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-[#0A0A20] p-5 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-900/30 group-hover:bg-purple-500 transition-colors duration-300 rounded-full p-2 mr-3">
                      <div className="text-purple-400 group-hover:text-black transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-white group-hover:text-purple-200 transition-colors duration-300">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Social Proof Section - NEW */}
      <AnimatedSection>
        <section className="py-16 bg-gradient-to-b from-[#0A0A20] to-[#050510]" aria-labelledby="testimonials">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-purple-500 text-lg font-medium pb-3 text-center">
              TRUSTED BY MEDICAL PROFESSIONALS
            </div>
            <h2 id="testimonials" className="text-3xl font-bold text-white mb-12 text-center">
              What Our Clients Say
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-full overflow-x-hidden">
              {[
                {
                  quote: "Our monthly revenue increased by $42,500 in our first quarter. By delegating coding to AI, I spend 8 more hours weekly with patients instead of paperwork.",
                  author: "Dr. Sarah Chen",
                  role: "Internal Medicine, Bay Area Medical",
                  stars: 5
                },
                {
                  quote: "We were losing $87,000 yearly to denied claims. With Astra, our acceptance rate jumped from 72% to 94% within three months. Billing is now a 10-minute task.",
                  author: "Dr. Michael Rodriguez",
                  role: "Family Practice, Westside Health",
                  stars: 5
                },
                {
                  quote: "After evaluating 5 different solutions, Astra was the only one that integrated seamlessly with our EHR. They had us operational in 48 hours with immediate ROI.",
                  author: "Lisa Johnson",
                  role: "Practice Manager, NorthEast Medical",
                  stars: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#0A0A20] p-5 rounded-xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < testimonial.stars ? 'text-purple-500' : 'text-gray-700'} mr-1`} 
                        fill={i < testimonial.stars ? '#8b5cf6' : 'none'} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-purple-900/30">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Trusted by Leading Medical Organizations
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                {['Bay Area Medical Network', 'California Health Consortium', 'Western Medical Alliance', 'National Physician Group', 'HealthTech Partners'].map((partner, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    <span className="text-gray-300">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Statistics Section - Improved for better readability */}
      <AnimatedSection>
        <section className="py-16" aria-labelledby="stats-heading">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 id="stats-heading" className="sr-only">Key Performance Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group text-center hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
                <div className="text-5xl md:text-6xl font-bold text-purple-500 mb-2 group-hover:text-purple-400 transition-colors">
                  95%
                </div>
                <p className="text-gray-300 group-hover:text-white transition-all">
                  Coding accuracy with Astra AI
                </p>
              </div>
              
              <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group text-center hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
                <div className="text-5xl md:text-6xl font-bold text-purple-500 mb-2 group-hover:text-purple-400 transition-colors">
                  10<span className="text-2xl md:text-3xl">min</span>
                </div>
                <p className="text-gray-300 group-hover:text-white transition-all">
                  Average time to complete billing process
                </p>
              </div>
              
              <div className="bg-[#0A0A20] p-6 rounded-xl border border-purple-900/50 hover:border-purple-500 transition-all duration-300 group text-center hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:-translate-y-1">
                <div className="text-5xl md:text-6xl font-bold text-purple-500 mb-2 group-hover:text-purple-400 transition-colors">
                  85%
                </div>
                <p className="text-gray-300 group-hover:text-white transition-all">
                  Reduction in claim denials
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Trust Indicators Section - NEW */}
      <AnimatedSection>
        <section className="py-12 bg-[#080818]" aria-labelledby="trust-section">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 id="trust-section" className="text-2xl font-bold text-white mb-8 text-center">
              Enterprise-Grade Security & Compliance
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-full overflow-hidden">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "HIPAA Compliant",
                  description: "256-bit encryption with BAA agreements and dedicated HIPAA officer"
                },
                {
                  icon: <Lock className="w-6 h-6" />,
                  title: "SOC 2 Type II Certified",
                  description: "Verified by independent auditors with zero critical findings"
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  title: "ISO 27001 & 27701",
                  description: "Dual certification for data security and privacy management"
                },
                {
                  icon: <ListChecks className="w-6 h-6" />,
                  title: "Quarterly Pen Testing",
                  description: "Conducted by independent security firms with published results"
                }
              ].map((item, index) => (
                <div key={index} className="bg-[#0A0A20] p-4 rounded-xl border border-purple-900/30 hover:border-purple-700/70 transition-all duration-300 text-center">
                  <div className="inline-flex items-center justify-center p-2 bg-purple-900/20 rounded-full mb-3">
                    <div className="text-purple-400">{item.icon}</div>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-sm">
                Your data is encrypted both in transit and at rest using industry-standard AES-256 encryption
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section - Improved for better conversion */}
      <AnimatedSection>
        <div className="bg-[#0A0A20] py-16" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4 lg:px-6 relative">
            {/* Circle pattern overlay */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#7c3aed" strokeWidth="0.2" strokeOpacity="0.2" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#7c3aed" strokeWidth="0.2" strokeOpacity="0.15" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#7c3aed" strokeWidth="0.2" strokeOpacity="0.1" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#7c3aed" strokeWidth="0.2" strokeOpacity="0.05" />
              </svg>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to reclaim 30% of your practice&#39;s revenue?
            </h2>
            <p className="text-gray-200 text-lg mb-8">
            Join 2,000+ healthcare providers who&#39;ve increased claim approvals by 85% and saved 15 hours per week on administrative tasks.
            </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/sign-up">
                  <button className="btn-primary group">
                    Start Free Trial
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} aria-hidden="true" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="btn-secondary group">
                    Schedule Demo
                    <Laptop className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={18} aria-hidden="true" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer - Improved accessibility and structure */}
      <footer className="bg-[#050510] border-t border-purple-900/30 py-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/astra-logo.png" alt="" width={24} height={24} className="mr-3" aria-hidden="true" />
                <h3 className="font-bold text-lg">ASTRA</h3>
              </div>
              <p className="text-gray-300">
                Transforming medical billing with AI-powered automation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Case Studies</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">About</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Team</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Careers</a></li>
                <li><Link href="/contact" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Security</a></li>
                <li><a href="#" className="hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-150">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-900/30 mt-8 pt-6 text-center text-gray-400">
            <p>© 2024 Astra Medical. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}