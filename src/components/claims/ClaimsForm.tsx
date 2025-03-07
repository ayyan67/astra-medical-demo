'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useClaimStore } from '@/store/claimStore';
import { predictCodes, generateClaimId, formatDate } from '@/lib/predictionUtils';
import type { ICodePrediction, IClaim } from '@/types/predictions';
import { 
  Upload, 
  FileText, 
  User, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  X,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  patientName: string;
  dateOfBirth: string;
  patientId: string;
  policyNumber: string;
  insuranceType: string;
  visitDate: string;
  visitLocation: string;
}

const ClaimForm = () => {
  const { addClaim } = useClaimStore();
  const [notesType, setNotesType] = useState('typed');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<ICodePrediction[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    dateOfBirth: '',
    patientId: '',
    policyNumber: '',
    insuranceType: 'Medicare',
    visitDate: formatDate(new Date()),
    visitLocation: 'Internal Medicine Clinic',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      // Show error
      return;
    }

    setProcessing(true);
    // Simulate ML processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newPredictions = predictCodes(notes);
    setPredictions(newPredictions);
    setProcessing(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      setFile(selectedFile);
      try {
        const text = await selectedFile.text();
        setNotes(text.slice(0, 1000)); // Limiting for demo purposes
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const toggleCodeSelection = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleClaimSubmission = () => {
    if (selectedCodes.length === 0) return;

    const newClaim: IClaim = {
      id: generateClaimId(),
      date: formatDate(new Date()),
      type: 'New',
      status: 'Pending',
      revenue: predictions.reduce(
        (sum, p) => (selectedCodes.includes(p.code) ? sum + 100 : sum),
        0
      ), // Dummy revenue calculation
      insurance: formData.insuranceType,
      codes: selectedCodes,
      notes: notes,
    };

    addClaim(newClaim);
    // Show success and then reset form
    setSubmitted(true);
    
    // Reset after a delay
    setTimeout(() => {
      setSubmitted(false);
      setNotes('');
      setFile(null);
      setSelectedCodes([]);
      setPredictions([]);
      setFormData({
        patientName: '',
        dateOfBirth: '',
        patientId: '',
        policyNumber: '',
        insuranceType: 'Medicare',
        visitDate: formatDate(new Date()),
        visitLocation: 'Internal Medicine Clinic',
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-green-900/20 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Claim Submitted Successfully!</h2>
          <p className="text-gray-400 mb-6">Your claim has been submitted and is being processed. You'll receive updates on its status.</p>
          <div className="p-4 bg-[#0A0A20]/80 border border-purple-900/30 rounded-md w-full max-w-md mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Claim ID:</span>
              <span className="text-white font-medium">{generateClaimId()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Patient:</span>
              <span className="text-white font-medium">{formData.patientName || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Submitted on:</span>
              <span className="text-white font-medium">{formatDate(new Date())}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/claims/history">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                View All Claims
              </button>
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 bg-[#0F0F30] text-white rounded-md hover:bg-[#191940] transition-colors border border-purple-900/30"
            >
              Submit Another Claim
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardHeader className="bg-[#0A0A20] text-white border-b border-purple-900/30 p-6">
        <CardTitle className="text-xl font-bold">Submit New Claim</CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-[#050510]">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Patient Information */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-white mb-2">
              <User className="mr-2 h-5 w-5 text-purple-400" />
              Patient Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Patient ID</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                  placeholder="Patient ID number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Policy Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                  placeholder="Insurance policy #"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Insurance Provider</label>
                <select
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                >
                  <option value="Medicare">Medicare</option>
                  <option value="Blue Shield">Blue Shield</option>
                  <option value="United Healthcare">United Healthcare</option>
                  <option value="Aetna">Aetna</option>
                  <option value="Cigna">Cigna</option>
                </select>
              </div>
            </div>
          </div>

          {/* Visit Information */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-white mb-2">
              <Calendar className="mr-2 h-5 w-5 text-purple-400" />
              Visit Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date of Visit</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  name="visitLocation"
                  value={formData.visitLocation}
                  onChange={handleFormChange}
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                  placeholder="Clinic or facility name"
                />
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-white mb-2">
              <FileText className="mr-2 h-5 w-5 text-purple-400" />
              Clinical Notes
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setNotesType('typed')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center ${
                    notesType === 'typed'
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-[#0F0F30] text-gray-300 hover:bg-[#191940] border border-purple-900/30'
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Type Notes
                </button>
                <button
                  type="button"
                  onClick={() => setNotesType('file')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center ${
                    notesType === 'file'
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-[#0F0F30] text-gray-300 hover:bg-[#191940] border border-purple-900/30'
                  }`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Notes
                </button>
              </div>

              {notesType === 'typed' ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder="Enter clinical notes here..."
                  className="w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-500"
                />
              ) : (
                <div className="mt-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-900/30 rounded-md bg-[#0A0A20]">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400 mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-500 mb-4">Supports .txt, .pdf, .doc, .docx files (10MB max)</p>
                  <input
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                  />
                  {file && (
                    <div className="mt-4 flex items-center p-2 rounded-md bg-[#0F0F30] w-full">
                      <FileText className="h-5 w-5 text-purple-400 mr-2" />
                      <p className="text-sm text-gray-300 truncate flex-1">{file.name}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setNotes('');
                        }}
                        className="p-1 rounded-full hover:bg-purple-900/20 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {notes.trim() === '' && (
                <div className="flex items-center space-x-2 text-yellow-300 bg-yellow-900/20 p-3 rounded-md text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>Clinical notes are required to analyze and generate codes.</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing || !notes.trim()}
              className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center ${
                processing || !notes.trim()
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {processing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Analyze & Generate Codes</>
              )}
            </button>
          </div>

          {/* Predicted Codes Section */}
          {predictions.length > 0 && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center text-lg font-medium text-white mb-2">
                <CreditCard className="mr-2 h-5 w-5 text-purple-400" />
                Generated ICD-10 & CPT Codes
              </div>
              <div className="space-y-3">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.code}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCodes.includes(prediction.code)
                        ? 'border-purple-500 bg-purple-900/20'
                        : 'border-purple-900/30 hover:border-purple-500/50 bg-[#0F0F30]'
                    }`}
                    onClick={() => toggleCodeSelection(prediction.code)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border mr-3 ${
                          selectedCodes.includes(prediction.code)
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-400'
                        }`}>
                          {selectedCodes.includes(prediction.code) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{prediction.code}</p>
                          <p className="text-sm text-gray-400">{prediction.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`text-xs rounded-full px-2 py-1 font-medium ${
                          prediction.confidence > 0.9
                            ? 'bg-green-900/20 text-green-400'
                            : prediction.confidence > 0.7
                            ? 'bg-yellow-900/20 text-yellow-400'
                            : 'bg-red-900/20 text-red-400'
                        }`}>
                          {(prediction.confidence * 100).toFixed(0)}% confidence
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={selectedCodes.length === 0}
                  onClick={handleClaimSubmission}
                  className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center ${
                    selectedCodes.length === 0
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Submit Claim with {selectedCodes.length} Selected {selectedCodes.length === 1 ? 'Code' : 'Codes'}
                </button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ClaimForm;