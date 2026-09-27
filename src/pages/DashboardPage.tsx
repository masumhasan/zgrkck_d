import React from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { UserAvatar } from '../components/shared/UserAvatar';
import { INITIAL_ACTIVITIES } from '../constants/mockData';

export const DashboardPage: React.FC = () => {
  const { users, recipes, navigateTo } = useApp();

  const previewUsers = users.slice(0, 3);

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Here's what needs your attention today."
    >
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Top Metrics Overview Grid */}
        <section
          aria-label="Key Performance Indicators"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <MetricCard
            label="TOTAL USERS"
            value="12,842"
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigateTo('users')}
          />
          <MetricCard
            label="TOTAL RECIPES"
            value={recipes.length > 0 ? '786' : '0'}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigateTo('recipes')}
          />
          <MetricCard
            label="TOTAL SUBSCRIBERS"
            value="1,248"
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigateTo('subscription')}
          />
          <MetricCard
            label="TOTAL REVENUE"
            value="$42,850"
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigateTo('subscription')}
          />
        </section>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: User Overview */}
          <section
            aria-labelledby="user-overview-heading"
            className="lg:col-span-2 bg-white border border-[#E5E2DC] rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#ECEAE4] gap-4">
              <h3
                id="user-overview-heading"
                className="text-lg font-editorial font-bold text-[#244E41]"
              >
                User Overview
              </h3>
              <div className="flex items-center space-x-6 text-xs">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    ACTIVE USERS
                  </span>
                  <span className="text-sm font-editorial font-bold text-[#244E41]">
                    11,402
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    NEW THIS WEEK
                  </span>
                  <span className="text-sm font-editorial font-bold text-[#A66C2F]">
                    +142
                  </span>
                </div>
              </div>
            </div>

            {/* User Rows List */}
            <div className="divide-y divide-[#F1EFEB] py-2">
              {previewUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => navigateTo('user-detail', user.id)}
                  className="py-4 flex items-center justify-between hover:bg-[#FAF9F6] px-2 rounded-md transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <UserAvatar
                      src={user.avatarUrl}
                      name={user.name}
                      initials={user.initials}
                      size="md"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 leading-tight">
                        {user.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={user.status === 'Active' ? 'active' : 'pending'}
                  >
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Bottom Button Action */}
            <div className="pt-4">
              <button
                onClick={() => navigateTo('users')}
                className="w-full flex items-center justify-center space-x-1.5 py-2 px-4 border border-[#D5D1C8] rounded text-xs font-medium text-slate-700 hover:bg-[#FAF9F6] transition-colors"
                type="button"
              >
                <span>View All Users</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </section>

          {/* Right Column: Recent Activity */}
          <section
            aria-labelledby="recent-activity-heading"
            className="bg-white border border-[#E5E2DC] rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <h3
              id="recent-activity-heading"
              className="text-lg font-editorial font-bold text-[#244E41] pb-3"
            >
              Recent Activity
            </h3>
            <div className="divide-y divide-[#F1EFEB]">
              {INITIAL_ACTIVITIES.map((act) => (
                <div key={act.id} className="py-3.5 flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#244E41] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-slate-800 leading-snug">
                      {act.title}
                    </p>
                    <span className="text-[11px] text-slate-500">
                      {act.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};
