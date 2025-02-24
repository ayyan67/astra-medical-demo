'use client';

import React from 'react';
import { ArrowRight, Check, Clock, PieChart, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-white font-bold text-xl">ASTRA MEDICAL</div>
          <div className="space-x-4">
            <Link href="/contact">
              <button className="text-white hover:text-blue-200">Contact</button>
            </Link>
            <Link href="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                Log In
              </button>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Boosting Revenue & Efficiency for Medical Practices
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Streamline your medical billing with AI-powered automation. File claims in under 10 minutes.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 flex items-center">
              Get Started <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Problem Statement Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            The Billing Problem
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25%</h3>
              <p className="text-gray-600">
                Time spent on administrative tasks
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <PieChart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">62%</h3>
              <p className="text-gray-600">
                Providers experience burnout
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">30%</h3>
              <p className="text-gray-600">
                Of all claims are denied
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Streamlined Medical Billing with Astra AI
            </h2>
            <p className="text-gray-600 text-lg">
              Transform your medical practice with our intelligent automation platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Coding",
                description: "AI-powered ICD/CPT code matching with 95% accuracy"
              },
              {
                title: "Quick Submission",
                description: "Submit claims in under 10 minutes with automated verification"
              },
              {
                title: "Real-time Tracking",
                description: "Monitor claim status and get instant updates"
              },
              {
                title: "Revenue Optimization",
                description: "Reduce claim denials and maximize reimbursements"
              },
              {
                title: "Compliance Assurance",
                description: "Stay compliant with automatic updates and checks"
              },
              {
                title: "24/7 Support",
                description: "Get help whenever you need it from our expert team"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-black">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to streamline your medical billing?
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ASTRA</h3>
              <p className="text-gray-400">
                Transforming medical billing with AI-powered automation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Case Studies</li>
                <li>Reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Team</li>
                <li>Careers</li>
                <li><Link href="/contact" className="hover:text-blue-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Astra Medical. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}