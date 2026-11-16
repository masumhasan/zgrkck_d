import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/shared/ConfirmDialog';
import { ErrorBlock, LoadingBlock } from '../components/shared/StatusViews';
import { Pagination } from '../components/shared/Pagination';
import { UsersTable } from '../features/users/UsersTable';
import { usersApi } from '../api/users.api';
import { plansApi } from '../api/plans.api';
import { errorMessage, useAsync, useDebounced } from '../hooks/useAsync';
import type { User } from '../types';

const PAGE_SIZE = 10;
const STATUS_OPTIONS = ['All', 'Active', 'Pending', 'Inactive', 'Suspended'];

const selectClass =
  'bg-transparent border-0 py-0 pl-1 pr-5 text-xs font-semibold text-[#1F2937] focus:ring-0 cursor-pointer';

export const UsersPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const search = useDebounced(searchTerm);
  const plans = useAsync(() => plansApi.list(), []);
  const users = useAsync(
    () => usersApi.list({ search, planId: planFilter, status: statusFilter, page, limit: PAGE_SIZE }),
    [search, planFilter, statusFilter, page]
  );

  const handleExport = async () => {
    setExportError(null);
    try {
      const csv = await usersApi.exportCsv({ search, planId: planFilter, status: statusFilter });
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mealist_users_export.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError(errorMessage(err));
    }
  };

  const blocking = userToToggle ? userToToggle.status !== 'Inactive' && userToToggle.status !== 'Suspended' : true;

  const confirmToggle = async () => {
    if (!userToToggle) return;
    await usersApi.setStatus(userToToggle.id, blocking ? 'inactive' : 'active');
    users.reload();
  };

  const pagination = users.data?.pagination;

  return (
    <AppLayout title="Users" subtitle="Manage Mealist.ai user accounts.">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Title & Export Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-editorial text-3xl font-bold text-[#1F2937] tracking-tight">Users</h2>
            <p className="text-sm text-[#6B7280] mt-1">Manage Mealist.ai user accounts.</p>
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={handleExport}
            icon={
              <svg className="w-4 h-4 text-[#4B5563]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
          >
            Export Users
          </Button>
        </div>
        {exportError && <p className="text-xs text-red-700">{exportError}</p>}

        {/* Filters & Results Counter Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#6B7280] gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-wider text-[#4B5563] uppercase text-[11px]">PLAN:</span>
              <select value={planFilter} onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }} className={selectClass}>
                <option value="All">All</option>
                {plans.data?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-4 w-px bg-[#D6D2CA]" />

            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-wider text-[#4B5563] uppercase text-[11px]">STATUS:</span>
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className={selectClass}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <span className="text-xs font-medium text-[#4B5563]">
            {pagination
              ? `Showing ${users.data?.items.length ?? 0} of ${pagination.total.toLocaleString()} result${pagination.total === 1 ? '' : 's'}`
              : ''}
          </span>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-[#6B7280]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-full bg-[#FAF9F5] border border-[#E5E0D8] rounded-md py-2.5 pl-10 pr-4 text-xs text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41] transition-all"
            placeholder="Search by name or email"
            type="text"
          />
        </div>

        {/* Users Table */}
        {users.error ? (
          <ErrorBlock message={users.error} onRetry={users.reload} />
        ) : users.loading && !users.data ? (
          <LoadingBlock label="Loading users…" />
        ) : (
          <div className={users.loading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <UsersTable
              users={users.data?.items ?? []}
              onSelectUser={(userId) => navigateTo('user-detail', userId)}
              onBlockUser={(user) => setUserToToggle(user)}
            />
            {pagination && pagination.totalPages > 1 && (
              <div className="bg-white rounded-b-xl border border-t-0 border-[#E5E1D8] -mt-px">
                <Pagination pagination={pagination} onPageChange={setPage} noun="users" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Block/Unblock */}
      <ConfirmDialog
        isOpen={!!userToToggle}
        onClose={() => setUserToToggle(null)}
        onConfirm={confirmToggle}
        title={blocking ? 'Block User Account' : 'Reactivate User Account'}
        message={
          blocking
            ? `Are you sure you want to block ${userToToggle?.name}? They will immediately lose access to the app.`
            : `Are you sure you want to reactivate ${userToToggle?.name}?`
        }
        confirmLabel={blocking ? 'Block User' : 'Reactivate'}
        isDanger={blocking}
      />
    </AppLayout>
  );
};
