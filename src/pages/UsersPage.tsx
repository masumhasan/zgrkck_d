import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/shared/ConfirmDialog';
import { UsersTable } from '../features/users/UsersTable';
import type { User } from '../types';

export const UsersPage: React.FC = () => {
  const { users, navigateTo, toggleUserStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUserToBlock, setSelectedUserToBlock] = useState<User | null>(
    null
  );

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan =
        planFilter === 'All' ||
        u.plan.toLowerCase() === planFilter.toLowerCase();
      const matchesStatus =
        statusFilter === 'All' ||
        u.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [users, searchTerm, planFilter, statusFilter]);

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Name,Email,Plan,Status,JoinedDate']
        .concat(
          filteredUsers.map(
            (u) => `${u.name},${u.email},${u.plan},${u.status},${u.joinedDate}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'mealist_users_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout title="Users" subtitle="Manage Mealist.ai user accounts.">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Title & Export Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-editorial text-3xl font-bold text-[#1F2937] tracking-tight">
              Users
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Manage Mealist.ai user accounts.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={handleExport}
            icon={
              <svg
                className="w-4 h-4 text-[#4B5563]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            }
          >
            Export Users
          </Button>
        </div>

        {/* Filters & Results Counter Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#6B7280] gap-4">
          <div className="flex items-center gap-6">
            {/* Plan Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-wider text-[#4B5563] uppercase text-[11px]">
                PLAN:
              </span>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="bg-transparent border-0 py-0 pl-1 pr-5 text-xs font-semibold text-[#1F2937] focus:ring-0 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Free">Free</option>
                <option value="Plus">Plus</option>
                <option value="Pro">Pro</option>
              </select>
            </div>

            <div className="h-4 w-px bg-[#D6D2CA]" />

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-wider text-[#4B5563] uppercase text-[11px]">
                STATUS:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-0 py-0 pl-1 pr-5 text-xs font-semibold text-[#1F2937] focus:ring-0 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <span className="text-xs font-medium text-[#4B5563]">
            Showing {filteredUsers.length} result
            {filteredUsers.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-[#6B7280]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-[#E5E0D8] rounded-md py-2.5 pl-10 pr-4 text-xs text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41] transition-all"
            placeholder="Search by name or email"
            type="text"
          />
        </div>

        {/* Users Table */}
        <UsersTable
          users={filteredUsers}
          onSelectUser={(userId) => navigateTo('user-detail', userId)}
          onBlockUser={(user) => setSelectedUserToBlock(user)}
        />
      </div>

      {/* Confirmation Dialog for Block/Unblock */}
      <ConfirmDialog
        isOpen={!!selectedUserToBlock}
        onClose={() => setSelectedUserToBlock(null)}
        onConfirm={() => {
          if (selectedUserToBlock) toggleUserStatus(selectedUserToBlock.id);
        }}
        title={
          selectedUserToBlock?.status === 'Active'
            ? 'Block User Account'
            : 'Reactivate User Account'
        }
        message={`Are you sure you want to ${
          selectedUserToBlock?.status === 'Active' ? 'block' : 'reactivate'
        } ${selectedUserToBlock?.name}?`}
        confirmLabel={
          selectedUserToBlock?.status === 'Active' ? 'Block User' : 'Reactivate'
        }
        isDanger={selectedUserToBlock?.status === 'Active'}
      />
    </AppLayout>
  );
};
