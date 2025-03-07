'use client';

import React, { useState } from 'react';
import { Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, simulate success
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={className}>
      {status === 'success' && (
        <div className="mb-6 p-4 border border-green-900/30 rounded-md bg-green-900/10 flex items-start">
          <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-400">Message Sent Successfully</h3>
            <p className="text-sm text-gray-300 mt-1">
              Thank you for contacting us. We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-6 p-4 border border-red-900/30 rounded-md bg-red-900/10 flex items-start">
          <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-400">Error Sending Message</h3>
            <p className="text-sm text-gray-300 mt-1">
              {errorMessage || 'There was a problem submitting your message. Please try again.'}
            </p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
              placeholder="Enter your name"
              required
              disabled={status === 'loading'}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
              placeholder="your.email@example.com"
              required
              disabled={status === 'loading'}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
            placeholder="What is this regarding?"
            required
            disabled={status === 'loading'}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
            placeholder="Type your message here..."
            required
            disabled={status === 'loading'}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-md font-medium transition-colors flex items-center bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}