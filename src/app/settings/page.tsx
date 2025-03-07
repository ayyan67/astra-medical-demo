'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CreditCard, ShieldCheck, ArrowLeft, Save, X, Building } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>
            <p className="text-gray-400">
              Manage your account, payment, and privacy settings
            </p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-purple-900/30 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <User className="h-4 w-4 mr-2" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('clinic')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'clinic'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Building className="h-4 w-4 mr-2" /> Clinic Information
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'payment'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="h-4 w-4 mr-2" /> Payment
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'privacy'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-4 w-4 mr-2" /> Privacy & Security
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'profile' && (
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-medium text-white">Provider Information</h2>
                <p className="text-sm text-gray-400 mt-1">Update your personal and professional details</p>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div className="flex justify-center mb-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-3xl font-bold shadow-md">
                        DA
                      </div>
                      <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-xs text-white font-medium">Change Photo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                      <input
                        type="text"
                        defaultValue="Dr. Astra"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">License Number</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Provider Number</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        defaultValue="drastra@gmail.com"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Specialty</label>
                      <select
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                      >
                        <option value="internal-medicine">Internal Medicine</option>
                        <option value="family-medicine">Family Medicine</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
                        <option value="pediatrics">Pediatrics</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-purple-900/30 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#0F0F30] text-white rounded-md hover:bg-[#191940] transition-colors border border-purple-900/30 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'clinic' && (
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-medium text-white">Clinic Information</h2>
                <p className="text-sm text-gray-400 mt-1">Update details about your medical practice</p>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Clinic/Practice Name</label>
                      <input
                        type="text"
                        defaultValue="Astra Medical Group"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Practice Type</label>
                      <select
                        className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                      >
                        <option value="private">Private Practice</option>
                        <option value="group">Group Practice</option>
                        <option value="hospital">Hospital Based</option>
                        <option value="academic">Academic Medical Center</option>
                        <option value="community">Community Health Center</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-purple-900/30 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#0F0F30] text-white rounded-md hover:bg-[#191940] transition-colors border border-purple-900/30 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'payment' && (
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-medium text-white">Payment Information</h2>
                <p className="text-sm text-gray-400 mt-1">Manage your billing and payment methods</p>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Payment Methods</h3>
                    <div className="bg-[#0F0F30] border border-purple-900/30 rounded-md p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-900/30 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                              <line x1="1" y1="10" x2="23" y2="10" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium">VISA ending in 4242</p>
                            <p className="text-gray-400 text-sm">Expires 05/2027</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button type="button" className="text-purple-400 hover:text-purple-300 text-sm">Edit</button>
                          <button type="button" className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#0F0F30] text-white rounded-md hover:bg-[#191940] transition-colors border border-purple-900/30 flex items-center text-sm"
                    >
                      + Add Payment Method
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Billing Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Billing Address</label>
                        <input
                          type="text"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">State / Province</label>
                        <input
                          type="text"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">ZIP / Postal Code</label>
                        <input
                          type="text"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                        <select
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                        >
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="au">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Billing History</h3>
                    <div className="border border-purple-900/30 rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#0A0A20] text-gray-400 text-xs uppercase">
                            <th className="px-4 py-3 font-medium text-left">Date</th>
                            <th className="px-4 py-3 font-medium text-left">Description</th>
                            <th className="px-4 py-3 font-medium text-right">Amount</th>
                            <th className="px-4 py-3 font-medium text-right">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-900/30">
                          <tr className="hover:bg-purple-900/10 transition-colors text-white">
                            <td className="px-4 py-3">Oct 25, 2024</td>
                            <td className="px-4 py-3">Monthly Subscription</td>
                            <td className="px-4 py-3 text-right">$99.00</td>
                            <td className="px-4 py-3 text-right">
                              <a href="#" className="text-purple-400 hover:text-purple-300">Download</a>
                            </td>
                          </tr>
                          <tr className="hover:bg-purple-900/10 transition-colors text-white">
                            <td className="px-4 py-3">Sep 25, 2024</td>
                            <td className="px-4 py-3">Monthly Subscription</td>
                            <td className="px-4 py-3 text-right">$99.00</td>
                            <td className="px-4 py-3 text-right">
                              <a href="#" className="text-purple-400 hover:text-purple-300">Download</a>
                            </td>
                          </tr>
                          <tr className="hover:bg-purple-900/10 transition-colors text-white">
                            <td className="px-4 py-3">Aug 25, 2024</td>
                            <td className="px-4 py-3">Monthly Subscription</td>
                            <td className="px-4 py-3 text-right">$99.00</td>
                            <td className="px-4 py-3 text-right">
                              <a href="#" className="text-purple-400 hover:text-purple-300">Download</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-purple-900/30 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#0F0F30] text-white rounded-md hover:bg-[#191940] transition-colors border border-purple-900/30 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'privacy' && (
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <CardContent className="p-0">
              <div className="p-6 border-b border-purple-900/30">
                <h2 className="text-xl font-medium text-white">Privacy & Security</h2>
                <p className="text-sm text-gray-400 mt-1">Manage your account security and data preferences</p>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        />
                      </div>
                      <div></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Two-factor Authentication</h3>
                    <div className="bg-[#0F0F30] border border-purple-900/30 rounded-md p-5">
                      <div className="flex items-start">
                        <div className="h-5 flex items-center mr-3">
                          <input
                            id="2fa-toggle"
                            type="checkbox"
                            className="h-4 w-4 rounded border-purple-900/30 text-purple-600 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="2fa-toggle" className="text-white font-medium">Enable two-factor authentication</label>
                          <p className="text-sm text-gray-400 mt-1">
                            Add an extra layer of security to your account by requiring a verification code in addition to your password.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Privacy Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="h-5 flex items-center mr-3">
                          <input
                            id="privacy-updates"
                            type="checkbox"
                            className="h-4 w-4 rounded border-purple-900/30 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                        </div>
                        <div>
                          <label htmlFor="privacy-updates" className="text-white font-medium">Receive product updates and newsletters</label>
                          <p className="text-sm text-gray-400 mt-1">
                            Get updates about new features, best practices, and industry news.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-5 flex items-center mr-3">
                          <input
                            id="privacy-data"
                            type="checkbox"
                            className="h-4 w-4 rounded border-purple-900/30 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                        </div>
                        <div>
                          <label htmlFor="privacy-data" className="text-white font-medium">Allow anonymous usage data collection</label>
                          <p className="text-sm text-gray-400 mt-1">
                            Help us improve our product by collecting anonymous usage data. No personal or patient information is ever collected.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-5 flex items-center mr-3">
                          <input
                            id="privacy-ai"
                            type="checkbox"
                            className="h-4 w-4 rounded border-purple-900/30 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                        </div>
                        <div>
                          <label htmlFor="privacy-ai" className="text-white font-medium">AI model improvement</label>
                          <p className="text-sm text-gray-400 mt-1">
                            Allow Astra Medical to use anonymized coding patterns to improve our AI models. All data is fully anonymized and complies with HIPAA regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Sessions & Devices</h3>
                    <div className="border border-purple-900/30 rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#0A0A20] text-gray-400 text-xs uppercase">
                            <th className="px-4 py-3 font-medium text-left">Device</th>
                            <th className="px-4 py-3 font-medium text-left">Location</th>
                            <th className="px-4 py-3 font-medium text-left">Last Activity</th>
                            <th className="px-4 py-3 font-medium text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-900/30">
                          <tr className="hover:bg-purple-900/10 transition-colors text-white">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Chrome on MacOS (Current)
                              </div>
                            </td>
                            <td className="px-4 py-3">San Francisco, CA</td>
                            <td className="px-4 py-3">Just now</td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-gray-400">Current session</span>
                            </td>
                          </tr>
                          <tr className="hover:bg-purple-900/10 transition-colors text-white">
                            <td className="px-4 py-3">Safari on iPhone</td>
                            <td className="px-4 py-3">San Francisco, CA</td>
                            <td className="px-4 py-3">Oct 23, 2024</td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-red-400 hover:text-red-300 text-sm">Sign out</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-purple-900/10 transition-colors text-white">
                            <td className="px-4 py-3">Chrome on Windows</td>
                            <td className="px-4 py-3">San Francisco, CA</td>
                            <td className="px-4 py-3">Oct 20, 2024</td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-red-400 hover:text-red-300 text-sm">Sign out</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-600/20 text-red-400 rounded-md hover:bg-red-600/30 transition-colors border border-red-900/30 text-sm"
                      >
                        Sign Out From All Devices
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-purple-900/30 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#0F0F30] text-white rounded-md hover:bg-[#191940] transition-colors border border-purple-900/30 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}