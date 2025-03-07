'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, Mail, Phone, Plus, Edit, Trash2, Search } from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  access: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'invited' | 'deactivated';
}

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterAccess, setFilterAccess] = useState('all');
  
  // Mock data for team members
  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Dr. Astra', role: 'Physician', email: 'dr.astra@example.com', phone: '(555) 123-4567', access: 'admin', status: 'active' },
    { id: '2', name: 'Jane Smith', role: 'Nurse Practitioner', email: 'jane.smith@example.com', phone: '(555) 234-5678', access: 'editor', status: 'active' },
    { id: '3', name: 'Michael Johnson', role: 'Medical Assistant', email: 'michael.j@example.com', phone: '(555) 345-6789', access: 'viewer', status: 'active' },
    { id: '4', name: 'Emily Williams', role: 'Receptionist', email: 'emily.w@example.com', phone: '(555) 456-7890', access: 'viewer', status: 'active' },
    { id: '5', name: 'David Brown', role: 'Billing Specialist', email: 'david.b@example.com', phone: '(555) 567-8901', access: 'editor', status: 'invited' },
    { id: '6', name: 'Lisa Davis', role: 'Office Manager', email: 'lisa.d@example.com', phone: '(555) 678-9012', access: 'editor', status: 'deactivated' },
  ];

  // Filter team members based on search term and filters
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || member.role.toLowerCase().includes(filterRole.toLowerCase());
    const matchesAccess = filterAccess === 'all' || member.access === filterAccess;
    
    return matchesSearch && matchesRole && matchesAccess;
  });

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Team Management</h1>
            </div>
            <p className="text-gray-400 mt-1">
              Manage your team members and their access permissions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  className="pl-10 pr-4 py-2 w-full rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full py-2 px-3 rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                >
                  <option value="all">All Roles</option>
                  <option value="physician">Physician</option>
                  <option value="nurse">Nurse</option>
                  <option value="assistant">Assistant</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="billing">Billing</option>
                  <option value="manager">Manager</option>
                </select>
                <select
                  value={filterAccess}
                  onChange={(e) => setFilterAccess(e.target.value)}
                  className="w-full py-2 px-3 rounded-md bg-[#0F0F30] border border-purple-900/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 text-white"
                >
                  <option value="all">All Access Levels</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMembers.map((member) => (
            <Card 
              key={member.id} 
              className={`overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] ${
                member.status === 'deactivated' ? 'opacity-60' : ''
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-sm font-bold shadow-md">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active' 
                        ? 'bg-green-900/40 text-green-300' 
                        : member.status === 'invited'
                        ? 'bg-yellow-900/40 text-yellow-300'
                        : 'bg-red-900/40 text-red-300'
                    }`}>
                      {member.status === 'active' 
                        ? 'Active' 
                        : member.status === 'invited'
                        ? 'Invited'
                        : 'Deactivated'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <a href={`mailto:${member.email}`} className="text-gray-300 hover:text-purple-400 transition-colors">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <a href={`tel:${member.phone}`} className="text-gray-300 hover:text-purple-400 transition-colors">
                      {member.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-purple-900/30">
                  <div>
                    <span className="text-xs text-gray-400">Access Level:</span>
                    <span className={`ml-2 text-sm ${
                      member.access === 'admin' 
                        ? 'text-purple-400' 
                        : member.access === 'editor'
                        ? 'text-blue-400'
                        : 'text-gray-300'
                    }`}>
                      {member.access.charAt(0).toUpperCase() + member.access.slice(1)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-md text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Add New Member Card */}
          <Card className="overflow-hidden hover:border-purple-500/70 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] border-dashed">
            <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[230px] cursor-pointer hover:bg-purple-900/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                <Plus className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-medium text-white mb-1">Add Team Member</h3>
              <p className="text-sm text-gray-400 text-center">
                Invite a new colleague to join your practice
              </p>
            </CardContent>
          </Card>
          
          {filteredMembers.length === 0 && searchTerm && (
            <div className="col-span-3 text-center py-8">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No team members found</h3>
              <p className="text-gray-400">
                No results match your search criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}