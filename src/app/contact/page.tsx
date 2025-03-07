'use client';

import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '@/components/shared/ContactForm';
import ContactInfo from '@/components/shared/ContactInfo';
import BusinessHours from '@/components/shared/BusinessHours';
import CardWithHeader from '@/components/shared/CardWithHeader';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0a0a20 0%, #050510 100%)',
        }}
        aria-hidden="true"
      />
      
      {/* Navbar */}
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
          <Link href="/" className="text-white hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] rounded-md px-2 py-1">
            Home
          </Link>
          <Link href="/login">
            <button className="bg-transparent border border-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-900/20 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] transition duration-300">
              Log In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050510] transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-4 lg:px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Have questions about Astra Medical or need assistance? We're here to help. 
          Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </header>

      <main className="container mx-auto px-4 lg:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CardWithHeader 
              title="Send a Message" 
              icon={MessageCircle}
            >
              <ContactForm />
            </CardWithHeader>
          </div>
          
          <div className="space-y-6">
            {/* Contact Information Card */}
            <CardWithHeader title="Contact Information">
              <ContactInfo />
            </CardWithHeader>
            
            {/* Business Hours Card */}
            <CardWithHeader title="Business Hours">
              <BusinessHours />
            </CardWithHeader>
            
            {/* Learn More Card */}
            <div className="bg-[#0A0A20] rounded-xl p-5 border border-purple-900/50 overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-5">
                <h3 className="text-xl font-medium text-white mb-3">Interested in Astra Medical?</h3>
                <p className="text-gray-300 mb-4">
                  Learn how our AI-powered platform can help increase your practice's revenue by 30% while reducing administrative burden.
                </p>
                <Link href="/">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-5 py-2 font-medium flex items-center transition-colors">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
                <li><Link href="/contact" className="text-purple-400 focus:outline-none focus:text-purple-500 transition-colors duration-150">Contact</Link></li>
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
            <p>© {new Date().getFullYear()} Astra Medical. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}