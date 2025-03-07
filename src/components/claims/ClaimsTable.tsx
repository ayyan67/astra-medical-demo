'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  FileEdit,
  FileX,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface Claim {
  id: string;
  date: string;
  type: string;
  status: string;
  revenue: number;
  insurance: string;
}

interface ClaimsTableProps {
  data?: Claim[];
  className?: string;
}

const sampleData: Claim[] = [
  { id: '608345', date: '10/25/24', type: 'New', status: 'Approved', revenue: 87.45, insurance: 'Medicare' },
  { id: '709234', date: '10/25/24', type: 'Returning', status: 'Approved', revenue: 125.80, insurance: 'Medicare' },
  { id: '810567', date: '10/23/24', type: 'Returning', status: 'Approved', revenue: 147.18, insurance: 'Medicare' },
  { id: '911234', date: '10/23/24', type: 'New', status: 'Pending', revenue: 75.36, insurance: 'United Healthcare' },
  { id: '102345', date: '10/25/24', type: 'Returning', status: 'Pending', revenue: 112.79, insurance: 'Blue Shield' },
  { id: '103456', date: '10/25/24', type: 'New', status: 'Approved', revenue: 98.25, insurance: 'Blue Shield' },
  { id: '204789', date: '10/24/24', type: 'Returning', status: 'Pending', revenue: 110.45, insurance: 'Blue Shield' },
  { id: '305123', date: '10/24/24', type: 'Returning', status: 'Pending', revenue: 89.90, insurance: 'United Healthcare' },
  { id: '406578', date: '10/24/24', type: 'New', status: 'Resubmitted', revenue: 105.20, insurance: 'United Healthcare' },
  { id: '507890', date: '10/23/24', type: 'New', status: 'Pending', revenue: 120.75, insurance: 'Medicare' },
];

// Status badge component for better reusability
const StatusBadge = ({ status }: { status: string }) => {
  let classes = '';
  
  switch (status) {
    case 'Approved':
      classes = 'bg-green-900/40 text-green-300';
      break;
    case 'Pending':
      classes = 'bg-yellow-900/40 text-yellow-300';
      break;
    default:
      classes = 'bg-blue-900/40 text-blue-300';
  }
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}>
      {status}
    </span>
  );
};

const ClaimsTable = ({ data = sampleData, className = '' }: ClaimsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterInsurance, setFilterInsurance] = useState('All');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize the filtered data to avoid recalculating on every render
  const filteredData = useMemo(() => {
    return data.filter((claim) => {
      const matchesSearch =
        claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.insurance.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'All' || claim.status === filterStatus;
      const matchesType = filterType === 'All' || claim.type === filterType;
      const matchesInsurance = filterInsurance === 'All' || claim.insurance === filterInsurance;
      
      return matchesSearch && matchesStatus && matchesType && matchesInsurance;
    });
  }, [data, searchTerm, filterStatus, filterType, filterInsurance]);

  // Calculate pagination based on filtered data
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  
  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterType, filterInsurance, rowsPerPage]);
  
  // Get current page data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Memoize these handlers to prevent recreating on every render
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  }, []);

  const handleInsuranceChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterInsurance(e.target.value);
  }, []);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  }, []);

  return (
    <Card className={`overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] ${className}`}>
      <CardHeader className="bg-[#0A0A20] text-white border-b border-purple-900/30 p-6">
        <CardTitle className="text-xl font-bold">Claims History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Filters and search */}
        <div className="p-4 border-b border-purple-900/30 bg-[#0F0F30]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search claim ID or insurance..."
                className="pl-10 pr-4 py-2 w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search claims"
              />
            </div>
            <div className="flex gap-3">
              <div className="min-w-[140px]">
                <select
                  value={filterStatus}
                  onChange={handleStatusChange}
                  className="w-full py-2 px-3 rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                  aria-label="Filter by status"
                >
                  <option value="All">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Resubmitted">Resubmitted</option>
                </select>
              </div>
              <div className="min-w-[140px]">
                <select
                  value={filterType}
                  onChange={handleTypeChange}
                  className="w-full py-2 px-3 rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                  aria-label="Filter by type"
                >
                  <option value="All">All Types</option>
                  <option value="New">New</option>
                  <option value="Returning">Returning</option>
                </select>
              </div>
              <div className="min-w-[160px]">
                <select
                  value={filterInsurance}
                  onChange={handleInsuranceChange}
                  className="w-full py-2 px-3 rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                  aria-label="Filter by insurance"
                >
                  <option value="All">All Insurance</option>
                  <option value="Medicare">Medicare</option>
                  <option value="Blue Shield">Blue Shield</option>
                  <option value="United Healthcare">United Healthcare</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Claims table */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[#0A0A20] text-gray-400 text-xs uppercase">
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center cursor-pointer">
                    Claim ID
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center cursor-pointer">
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center cursor-pointer">
                    Revenue
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Insurance</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {paginatedData.map((claim) => (
                <tr key={claim.id} className="hover:bg-purple-900/10 transition-colors text-white">
                  <td className="px-6 py-4 font-medium">{claim.id}</td>
                  <td className="px-6 py-4">{claim.date}</td>
                  <td className="px-6 py-4">{claim.type}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="px-6 py-4 font-medium">${claim.revenue.toFixed(2)}</td>
                  <td className="px-6 py-4">{claim.insurance}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-gray-400 hover:text-purple-400 transition-colors" 
                        title="View details"
                        aria-label={`View details for claim ${claim.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-purple-400 transition-colors" 
                        title="Edit claim"
                        aria-label={`Edit claim ${claim.id}`}
                      >
                        <FileEdit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-400 transition-colors" 
                        title="Delete claim"
                        aria-label={`Delete claim ${claim.id}`}
                      >
                        <FileX className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr className="text-center">
                  <td colSpan={7} className="px-6 py-8 text-gray-400">
                    No claims match your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-[#0A0A20] border-t border-purple-900/30 flex flex-col sm:flex-row justify-between items-center text-white">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="text-sm text-gray-400">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="bg-[#0F0F30] border border-purple-900/30 rounded-md text-white px-2 py-1 text-sm focus:border-purple-500 focus:ring focus:ring-purple-500/20"
              aria-label="Select rows per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-1 rounded-md text-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed hover:text-white hover:bg-purple-900/20 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md text-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed hover:text-white hover:bg-purple-900/20 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsTable;