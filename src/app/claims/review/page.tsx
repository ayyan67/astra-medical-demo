'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Filter, 
  Search, 
  SlidersHorizontal, 
  XCircle, 
  Eye,
  ArrowUpDown,
  ChevronDown,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

// Loading placeholder for the table
const TableLoadingState = () => (
  <div className="space-y-3">
    <div className="h-10 bg-[#0A0A20]/50 animate-pulse rounded-md w-full"></div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-16 bg-[#0A0A20]/70 animate-pulse rounded-md w-full"></div>
    ))}
  </div>
);

// Claim status component with appropriate colors and icons
const ClaimStatus = ({ status }: { status: string }) => {
  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending documentation':
        return { 
          color: 'bg-amber-900/20 text-amber-400 border-amber-900/50', 
          icon: <Clock className="h-3 w-3 mr-1" /> 
        };
      case 'requires review':
        return { 
          color: 'bg-purple-900/20 text-purple-400 border-purple-900/50', 
          icon: <AlertCircle className="h-3 w-3 mr-1" /> 
        };
      case 'denied - resubmit':
        return { 
          color: 'bg-red-900/20 text-red-400 border-red-900/50', 
          icon: <XCircle className="h-3 w-3 mr-1" /> 
        };
      case 'approved':
        return { 
          color: 'bg-green-900/20 text-green-400 border-green-900/50', 
          icon: <CheckCircle className="h-3 w-3 mr-1" /> 
        };
      default:
        return { 
          color: 'bg-gray-900/20 text-gray-400 border-gray-900/50', 
          icon: <Clock className="h-3 w-3 mr-1" /> 
        };
    }
  };

  const { color, icon } = getStatusDetails(status);

  return (
    <Badge className={`${color} flex items-center font-normal`} variant="outline">
      {icon}
      {status}
    </Badge>
  );
};

// Sample data for claims
const claimData = [
  { 
    id: "CL-9876", 
    patient: "Emma Thompson", 
    date: "2025-02-28", 
    amount: "$1,250.00", 
    status: "Pending Documentation", 
    insurance: "Blue Cross",
    cptCodes: ["99214", "85027"],
    icdCodes: ["E11.9", "I10"],
    issues: ["Missing diagnosis date", "Incomplete patient history"]
  },
  { 
    id: "CL-9421", 
    patient: "Michael Chen", 
    date: "2025-03-01", 
    amount: "$3,450.00", 
    status: "Requires Review", 
    insurance: "Medicare",
    cptCodes: ["99223", "93010"],
    icdCodes: ["I21.3", "E78.5"],
    issues: ["Possible code mismatch", "Supporting documentation needed"]
  },
  { 
    id: "CL-8732", 
    patient: "Sarah Johnson", 
    date: "2025-02-27", 
    amount: "$780.00", 
    status: "Denied - Resubmit", 
    insurance: "Aetna",
    cptCodes: ["99213", "20610"],
    icdCodes: ["M17.11", "M25.561"],
    issues: ["Service not covered", "Prior authorization missing"]
  },
  { 
    id: "CL-8541", 
    patient: "Robert Williams", 
    date: "2025-02-25", 
    amount: "$950.00", 
    status: "Requires Review", 
    insurance: "United Healthcare",
    cptCodes: ["99215", "93000"],
    icdCodes: ["I50.9", "J45.909"],
    issues: ["Discrepancy in service dates", "Modifier needed"]
  },
  { 
    id: "CL-8396", 
    patient: "Jennifer Garcia", 
    date: "2025-02-22", 
    amount: "$1,870.00", 
    status: "Pending Documentation", 
    insurance: "Cigna",
    cptCodes: ["27447", "01402"],
    icdCodes: ["M17.0", "E66.01"],
    issues: ["Missing operative report", "Incomplete consent form"]
  },
  { 
    id: "CL-8102", 
    patient: "David Kim", 
    date: "2025-02-19", 
    amount: "$545.00", 
    status: "Approved", 
    insurance: "Medicare",
    cptCodes: ["99214", "94060"],
    icdCodes: ["J44.9", "J45.901"],
    issues: []
  },
  { 
    id: "CL-7964", 
    patient: "Lisa Martinez", 
    date: "2025-02-17", 
    amount: "$2,340.00", 
    status: "Approved", 
    insurance: "Blue Shield",
    cptCodes: ["43239", "99233"],
    icdCodes: ["K21.9", "E66.9"],
    issues: []
  },
  { 
    id: "CL-7821", 
    patient: "James Taylor", 
    date: "2025-02-15", 
    amount: "$1,125.00", 
    status: "Denied - Resubmit", 
    insurance: "Humana",
    cptCodes: ["99223", "71045"],
    icdCodes: ["J18.9", "J96.01"],
    issues: ["Diagnosis code inconsistent with procedure", "Medical necessity not established"]
  }
];

export default function ClaimsReviewPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeframeFilter, setTimeframeFilter] = useState('all');
  const [insuranceFilter, setInsuranceFilter] = useState('all');
  const [sort, setSort] = useState({ field: 'date', direction: 'desc' });
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort the claims
  const filteredClaims = claimData
    .filter(claim => {
      // Search filter
      if (searchTerm && !claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !claim.id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && claim.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      
      // Insurance filter
      if (insuranceFilter !== 'all' && claim.insurance !== insuranceFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort logic
      if (sort.field === 'date') {
        return sort.direction === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      
      if (sort.field === 'amount') {
        const amountA = parseFloat(a.amount.replace(/[$,]/g, ''));
        const amountB = parseFloat(b.amount.replace(/[$,]/g, ''));
        return sort.direction === 'desc' ? amountB - amountA : amountA - amountB;
      }
      
      return 0;
    });

  // Handle claim view/edit
  const handleViewClaim = (claim: any) => {
    setSelectedClaim(claim);
    setVisibleDialog(true);
  };

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sort.field === field) {
      setSort({
        field,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSort({
        field,
        direction: 'desc',
      });
    }
  };

  // Get unique insurance providers for filter
  const insuranceProviders = ['all', ...new Set(claimData.map(claim => claim.insurance))];

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Claims Review</h1>
          <p className="text-gray-400 mt-1">
            Review and resolve claims requiring attention
          </p>
        </div>
      </div>

      {/* Tabs for different claim categories */}
      <Tabs defaultValue="needs-attention" className="mb-6">
        <TabsList className="bg-[#0F0F30] border border-purple-900/30">
          <TabsTrigger value="needs-attention" className="data-[state=active]:bg-purple-900/30">
            Needs Attention
          </TabsTrigger>
          <TabsTrigger value="all-claims" className="data-[state=active]:bg-purple-900/30">
            All Claims
          </TabsTrigger>
          <TabsTrigger value="denied" className="data-[state=active]:bg-purple-900/30">
            Denied
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-purple-900/30">
            Approved
          </TabsTrigger>
        </TabsList>

        {/* Filter and search toolbar */}
        <div className="my-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by patient name or claim ID..."
              className="pl-9 bg-[#0A0A20] border-purple-900/30 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] bg-[#0A0A20] border-purple-900/30">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F0F30] border-purple-900/30">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending documentation">Pending Documentation</SelectItem>
                <SelectItem value="requires review">Requires Review</SelectItem>
                <SelectItem value="denied - resubmit">Denied - Resubmit</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={insuranceFilter} onValueChange={setInsuranceFilter}>
              <SelectTrigger className="w-[180px] bg-[#0A0A20] border-purple-900/30">
                <SelectValue placeholder="Insurance" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F0F30] border-purple-900/30">
                {insuranceProviders.map(provider => (
                  <SelectItem key={provider} value={provider}>
                    {provider === 'all' ? 'All Insurers' : provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="bg-[#0A0A20] border-purple-900/30">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Content for each tab */}
        <TabsContent value="needs-attention">
          <Card className="bg-[#0A0A20] border-purple-900/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-400" />
                Claims Requiring Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableLoadingState />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-900/30 hover:bg-purple-900/10">
                        <TableHead className="text-purple-300">Claim ID</TableHead>
                        <TableHead className="text-purple-300">Patient</TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('date')}>
                          <div className="flex items-center">
                            Date 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('amount')}>
                          <div className="flex items-center">
                            Amount 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300">Insurance</TableHead>
                        <TableHead className="text-purple-300">Status</TableHead>
                        <TableHead className="text-purple-300 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims
                        .filter(claim => claim.status !== "Approved")
                        .map((claim) => (
                          <TableRow key={claim.id} className="border-purple-900/30 hover:bg-purple-900/10">
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell>{claim.patient}</TableCell>
                            <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                            <TableCell>{claim.amount}</TableCell>
                            <TableCell>{claim.insurance}</TableCell>
                            <TableCell>
                              <ClaimStatus status={claim.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                                onClick={() => handleViewClaim(claim)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {filteredClaims.filter(claim => claim.status !== "Approved").length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No claims require attention matching your filters.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-claims">
          <Card className="bg-[#0A0A20] border-purple-900/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-400" />
                All Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableLoadingState />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-900/30 hover:bg-purple-900/10">
                        <TableHead className="text-purple-300">Claim ID</TableHead>
                        <TableHead className="text-purple-300">Patient</TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('date')}>
                          <div className="flex items-center">
                            Date 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('amount')}>
                          <div className="flex items-center">
                            Amount 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300">Insurance</TableHead>
                        <TableHead className="text-purple-300">Status</TableHead>
                        <TableHead className="text-purple-300 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.map((claim) => (
                        <TableRow key={claim.id} className="border-purple-900/30 hover:bg-purple-900/10">
                          <TableCell className="font-medium">{claim.id}</TableCell>
                          <TableCell>{claim.patient}</TableCell>
                          <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                          <TableCell>{claim.amount}</TableCell>
                          <TableCell>{claim.insurance}</TableCell>
                          <TableCell>
                            <ClaimStatus status={claim.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                              onClick={() => handleViewClaim(claim)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredClaims.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No claims matching your filters.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="denied">
          <Card className="bg-[#0A0A20] border-purple-900/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-400" />
                Denied Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableLoadingState />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-900/30 hover:bg-purple-900/10">
                        <TableHead className="text-purple-300">Claim ID</TableHead>
                        <TableHead className="text-purple-300">Patient</TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('date')}>
                          <div className="flex items-center">
                            Date 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('amount')}>
                          <div className="flex items-center">
                            Amount 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300">Insurance</TableHead>
                        <TableHead className="text-purple-300">Status</TableHead>
                        <TableHead className="text-purple-300 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims
                        .filter(claim => claim.status.toLowerCase().includes('denied'))
                        .map((claim) => (
                          <TableRow key={claim.id} className="border-purple-900/30 hover:bg-purple-900/10">
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell>{claim.patient}</TableCell>
                            <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                            <TableCell>{claim.amount}</TableCell>
                            <TableCell>{claim.insurance}</TableCell>
                            <TableCell>
                              <ClaimStatus status={claim.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                                onClick={() => handleViewClaim(claim)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {filteredClaims.filter(claim => claim.status.toLowerCase().includes('denied')).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No denied claims matching your filters.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card className="bg-[#0A0A20] border-purple-900/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                Approved Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableLoadingState />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-900/30 hover:bg-purple-900/10">
                        <TableHead className="text-purple-300">Claim ID</TableHead>
                        <TableHead className="text-purple-300">Patient</TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('date')}>
                          <div className="flex items-center">
                            Date 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300 cursor-pointer" onClick={() => toggleSort('amount')}>
                          <div className="flex items-center">
                            Amount 
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-purple-300">Insurance</TableHead>
                        <TableHead className="text-purple-300">Status</TableHead>
                        <TableHead className="text-purple-300 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims
                        .filter(claim => claim.status === "Approved")
                        .map((claim) => (
                          <TableRow key={claim.id} className="border-purple-900/30 hover:bg-purple-900/10">
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell>{claim.patient}</TableCell>
                            <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                            <TableCell>{claim.amount}</TableCell>
                            <TableCell>{claim.insurance}</TableCell>
                            <TableCell>
                              <ClaimStatus status={claim.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                                onClick={() => handleViewClaim(claim)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {filteredClaims.filter(claim => claim.status === "Approved").length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No approved claims matching your filters.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal dialog for claim details */}
      {selectedClaim && visibleDialog && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setVisibleDialog(false)}></div>
          <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border border-purple-900/30 bg-[#0A0A20] p-6 shadow-lg rounded-lg">
            <button 
              className="absolute right-4 top-4 rounded-sm opacity-70 text-gray-400 hover:opacity-100 focus:outline-none"
              onClick={() => setVisibleDialog(false)}
            >
              <XCircle className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
            
            <div className="mb-4">
              <h2 className="text-xl font-bold">Claim Details - {selectedClaim.id}</h2>
              <p className="text-gray-400 text-sm">Review and manage the claim for {selectedClaim.patient}</p>
            </div>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Patient</p>
                  <p className="font-medium">{selectedClaim.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Insurance</p>
                  <p className="font-medium">{selectedClaim.insurance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date of Service</p>
                  <p className="font-medium">{new Date(selectedClaim.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="font-medium">{selectedClaim.amount}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <ClaimStatus status={selectedClaim.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-400 mb-1">CPT Codes</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClaim.cptCodes.map((code: string) => (
                      <Badge key={code} className="bg-purple-900/20 text-purple-300 border-purple-900/50" variant="outline">
                        {code}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">ICD-10 Codes</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClaim.icdCodes.map((code: string) => (
                      <Badge key={code} className="bg-blue-900/20 text-blue-300 border-blue-900/50" variant="outline">
                        {code}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedClaim.issues && selectedClaim.issues.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-400 mb-1">Issues Requiring Attention</p>
                  <ul className="space-y-2">
                    {selectedClaim.issues.map((issue: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-400 mr-2 mt-0.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
              <Button variant="outline" className="border-purple-900/50 hover:bg-purple-900/20 mt-2 sm:mt-0">
                Download Claim
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setVisibleDialog(false)}
              >
                {selectedClaim.status === "Approved" 
                  ? "Close" 
                  : selectedClaim.status.toLowerCase().includes('denied')
                    ? "Resubmit Claim"
                    : "Resolve Issues"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}