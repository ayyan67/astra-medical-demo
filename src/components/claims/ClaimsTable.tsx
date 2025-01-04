import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Claim {
  id: string;
  date: string;
  type: string;
  status: string;
  revenue: number;
  insurance: string;
}

const sampleData: Claim[] = [
  { id: '608345', date: '10/25/24', type: 'New', status: 'Approved', revenue: 87.45, insurance: 'Medicare' },
  { id: '709234', date: '10/25/24', type: 'Returning', status: 'Approved', revenue: 125.80, insurance: 'Medicare' },
  { id: '810567', date: '10/23/24', type: 'Returning', status: 'Approved', revenue: 147.18, insurance: 'Medicare' },
  { id: '911234', date: '10/23/24', type: 'New', status: 'Pending', revenue: 75.36, insurance: 'United Healthcare' },
  { id: '102345', date: '10/25/24', type: 'Returning', status: 'Pending', revenue: 112.79, insurance: 'Blue Shield' },
];

const ClaimsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Claim ID</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Revenue</th>
                <th className="px-6 py-3">Insurance</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((claim) => (
                <tr key={claim.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">{claim.id}</td>
                  <td className="px-6 py-4">{claim.date}</td>
                  <td className="px-6 py-4">{claim.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      claim.status === 'Approved' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">${claim.revenue.toFixed(2)}</td>
                  <td className="px-6 py-4">{claim.insurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsTable;