import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/ui/MetricCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { ConfirmDialog } from '../components/shared/ConfirmDialog';
import { UserAvatar } from '../components/shared/UserAvatar';
import { ErrorBlock, InlineError, LoadingBlock } from '../components/shared/StatusViews';
import { usersApi } from '../api/users.api';
import { plansApi } from '../api/plans.api';
import { errorMessage, useAsync } from '../hooks/useAsync';
import { formatDate, formatLastActive } from '../utils/format';
import { statusBadgeVariant } from '../utils/badges';

export const UserDetailPage: React.FC = () => {
  const { selectedUserId, navigateTo } = useApp();
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);

  const detail = useAsync(
    () => (selectedUserId ? usersApi.get(selectedUserId) : Promise.reject(new Error('No user selected'))),
    [selectedUserId]
  );
  const plans = useAsync(() => plansApi.list(), []);

  const user = detail.data;
  const isBlocked = user?.status === 'Suspended' || user?.status === 'Inactive';

  const aiPercent = user
    ? Math.min(Math.round((user.usage.aiGenerations.used / Math.max(user.usage.aiGenerations.limit, 1)) * 100), 100)
    : 0;

  const handlePlanChange = async (planId: string) => {
    if (!user) return;
    setPlanError(null);
    try {
      await usersApi.setPlan(user.id, planId);
      detail.reload();
    } catch (err) {
      setPlanError(errorMessage(err));
    }
  };

  const backLink = (
    <div>
      <button
        onClick={() => navigateTo('users')}
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#244E41] hover:opacity-75 transition-opacity"
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Users</span>
      </button>
    </div>
  );

  if (!user) {
    return (
      <AppLayout title="User Detail" subtitle="Detailed activity and account usage overview.">
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
          {backLink}
          {detail.error ? (
            <ErrorBlock message={detail.error} onRetry={detail.reload} />
          ) : (
            <LoadingBlock label="Loading user…" />
          )}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="User Detail"
      subtitle="Detailed activity and account usage overview."
    >
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {backLink}

        {/* User Title Header & Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl md:text-[34px] font-editorial font-bold text-[#244E41]">
            {user.name}
          </h1>
          <Badge
            variant={statusBadgeVariant(user.status)}
            showDot
            className="text-[13px] px-3 py-1 self-start sm:self-auto"
          >
            {user.status}
          </Badge>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Profile & Activity) */}
          <div className="lg:col-span-8 space-y-8">
            {/* User Profile Card */}
            <section className="bg-white rounded-xl border border-[#E5E1D8] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <UserAvatar
                  src={user.avatarUrl}
                  name={user.name}
                  initials={user.initials}
                  size="xl"
                  shape="rounded"
                />

                {/* User Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12 w-full">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                      Email Address
                    </p>
                    <p className="text-[14px] text-gray-900 font-medium mt-0.5 break-all">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                      Current Plan
                    </p>
                    <p className="text-[14px] text-gray-900 font-semibold mt-0.5">
                      {user.plan}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                      Account Created
                    </p>
                    <p className="text-[14px] text-gray-900 font-normal mt-0.5">
                      {formatDate(user.joinedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                      Last Active
                    </p>
                    <p className="text-[14px] text-gray-900 font-normal mt-0.5">
                      {formatLastActive(user.lastActiveAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Activity Section */}
            <section>
              <h2 className="text-xl font-editorial font-bold text-[#244E41] mb-4">
                Product Activity
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MetricCard
                  label="Plans Generated"
                  value={user.productActivity.plansGenerated}
                  height="h-[152px]"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  }
                />
                <MetricCard
                  label="Meals Planned"
                  value={user.productActivity.mealsPlanned}
                  height="h-[152px]"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v2m-4-2v2m8-2v2M3 11h18v2a6 6 0 01-6 6H9a6 6 0 01-6-6v-2z" />
                    </svg>
                  }
                />
                <MetricCard
                  label="Pantry Items"
                  value={user.productActivity.pantryItems}
                  height="h-[152px]"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  }
                />
                <MetricCard
                  label="Shopping Items"
                  value={user.productActivity.shoppingItems}
                  height="h-[152px]"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  }
                />
              </div>
            </section>
          </div>

          {/* Right Column (Usage & Danger Zone) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Current Usage Card */}
            <section className="bg-white rounded-xl border border-[#E5E1D8] p-6 shadow-sm">
              <h3 className="text-xl font-editorial font-bold text-[#244E41] mb-5">
                Current Usage
              </h3>

              <div className="mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center justify-between text-[13px] mb-2 font-medium">
                  <span className="text-gray-900">AI Generation Limit</span>
                  <span className="text-gray-500 font-normal">
                    {user.usage.aiGenerations.used} / {user.usage.aiGenerations.limit}
                  </span>
                </div>
                <div className="w-full bg-[#E8E6E0] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#244E41] h-1.5 rounded-full transition-all"
                    style={{ width: `${aiPercent}%` }}
                  />
                </div>
                <p className="text-[12px] text-slate-500 mt-2.5">
                  Resets on {formatDate(user.usage.aiGenerations.resetAt)}
                </p>
              </div>

              <div className="space-y-3.5 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pantry Items</span>
                  <span className="text-gray-900 font-medium">{user.usage.pantryItems.used}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shopping List Items</span>
                  <span className="text-gray-900 font-medium">{user.usage.shoppingItems.used}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Excluded Ingredients</span>
                  <span className="text-gray-900 font-medium">{user.usage.excludedIngredients.used}</span>
                </div>
              </div>
            </section>

            {/* Account Actions Card */}
            <section className="bg-white rounded-xl border border-[#E5E1D8] p-6 shadow-sm">
              <h3 className="text-xl font-editorial font-bold text-[#244E41] mb-2">
                Account Actions
              </h3>
              <p className="text-[12.5px] leading-relaxed text-slate-500 mb-5">
                Manage the subscription plan and account status. Suspending this account will immediately revoke access.
              </p>
              <div className="mb-4 space-y-1.5">
                <Select
                  label="Subscription Plan"
                  className="w-full"
                  value={user.planId ?? ''}
                  onChange={(e) => void handlePlanChange(e.target.value)}
                  options={(plans.data ?? []).map((p) => ({ label: p.name, value: p.id }))}
                />
                <InlineError message={planError} />
              </div>
              {isBlocked ? (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setIsSuspendModalOpen(true)}
                >
                  Reactivate Account
                </Button>
              ) : (
                <Button
                  variant="danger"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setIsSuspendModalOpen(true)}
                  icon={
                    <svg className="w-4 h-4 text-[#D83A3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  }
                >
                  Suspend Account
                </Button>
              )}
              <Button
                variant="danger"
                size="md"
                className="w-full justify-center mt-3"
                onClick={() => setIsDeleteModalOpen(true)}
                icon={
                  <svg className="w-4 h-4 text-[#D83A3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                Permanently Delete Account
              </Button>
            </section>
          </div>
        </div>
      </div>

      {/* Confirm Suspend / Reactivate Modal */}
      <ConfirmDialog
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={async () => {
          await usersApi.setStatus(user.id, isBlocked ? 'active' : 'suspended');
          detail.reload();
        }}
        title={isBlocked ? 'Reactivate User Account' : 'Suspend User Account'}
        message={
          isBlocked
            ? `Reactivate ${user.name}'s account? They will regain access to Mealist.ai.`
            : `Are you sure you want to suspend ${user.name}'s account? They will immediately lose access to all Mealist.ai features.`
        }
        confirmLabel={isBlocked ? 'Reactivate' : 'Suspend User'}
        isDanger={!isBlocked}
      />

      {/* Confirm Permanent Delete Modal */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await usersApi.remove(user.id);
          navigateTo('users');
        }}
        title="Permanently Delete Account"
        message={`Are you sure you want to permanently delete ${user.name}'s account? All of their data will be erased and this action cannot be undone.`}
        confirmLabel="Delete Permanently"
        isDanger
      />
    </AppLayout>
  );
};
