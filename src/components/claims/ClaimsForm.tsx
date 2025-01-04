import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useClaimStore } from '@/store/claimStore';
import { predictCodes, generateClaimId, formatDate } from '@/lib/predictionUtils';
import type { ICodePrediction, IClaim } from '@/types/predictions';

interface FormData {
  patientName: string;
  dateOfBirth: string;
  patientId: string;
  policyNumber: string;
  insuranceType: string;
}

const ClaimForm = () => {
  const { addClaim } = useClaimStore();
  const [notesType, setNotesType] = useState('typed');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<ICodePrediction[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    dateOfBirth: '',
    patientId: '',
    policyNumber: '',
    insuranceType: 'Medicare',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes) return;

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
        setNotes(text);
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
    // Reset form
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
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Claim</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="font-medium">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Policy #</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Insurance Type</label>
                <select
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                >
                  <option value="Medicare">Medicare</option>
                  <option value="Blue Shield">Blue Shield</option>
                  <option value="United Healthcare">United Healthcare</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Clinical Notes</h3>
            <div className="space-y-2">
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setNotesType('typed')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    notesType === 'typed'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Type Notes
                </Button>
                <Button
                  type="button"
                  onClick={() => setNotesType('file')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    notesType === 'file'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Upload Notes
                </Button>
              </div>

              {notesType === 'typed' ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder="Enter clinical notes here..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                />
              ) : (
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 hover:file:bg-gray-200"
                  />
                  {file && (
                    <p className="mt-2 text-sm text-gray-500">
                      File selected: {file.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              disabled={processing || !notes}
              className={`px-4 py-2 rounded-md font-medium ${
                processing || !notes
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {processing ? 'Processing...' : 'Analyze Notes'}
            </Button>
          </div>

          {predictions.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Predicted ICD-10 Codes</h3>
              <div className="space-y-3">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.code}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCodes.includes(prediction.code)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => toggleCodeSelection(prediction.code)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{prediction.code}</p>
                        <p className="text-sm text-gray-600">{prediction.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Confidence: {(prediction.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  disabled={selectedCodes.length === 0}
                  onClick={handleClaimSubmission}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit Claim with Selected Codes
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ClaimForm;
