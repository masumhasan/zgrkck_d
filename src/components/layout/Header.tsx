import React, { useCallback, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dashboardApi } from '../../api/plans.api';
import { timeAgo } from '../../utils/format';
import type { ActivityItem } from '../../types';

const SEEN_KEY = 'mealist_notifications_seen';

const readSeen = (): number => {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
};

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  headerActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Dashboard',
  subtitle = "Here's what needs your attention today.",
  onOpenMobileMenu,
  headerActions,
}) => {
  const { admin, navigateTo, logout } = useApp();
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [seenAt, setSeenAt] = useState<number>(readSeen);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const loadActivity = useCallback(() => {
    dashboardApi
      .activity(6)
      .then(setActivity)
      .catch(() => setActivity([]));
  }, []);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const newestAt = activity[0] ? new Date(activity[0].createdAt).getTime() : 0;
  const hasUnreadNotification = newestAt > seenAt;

  const handleNotificationClick = () => {
    const opening = !showNotifications;
    setShowNotifications(opening);
    setShowProfileMenu(false);
    if (opening) {
      loadActivity();
      if (newestAt) {
        setSeenAt(newestAt);
        try {
          localStorage.setItem(SEEN_KEY, String(newestAt));
        } catch {
          /* storage unavailable */
        }
      }
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  return (
    <header className="h-20 bg-[#FAF8F5] border-b border-[#E8E5DF] px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-4">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden text-slate-600 hover:text-slate-900 p-1 rounded-md"
            aria-label="Open navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <div>
          <h2 className="text-2xl font-editorial font-bold text-[#244E41] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications, and Profile Area */}
      <div className="flex items-center space-x-4 md:space-x-5">
        {headerActions}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            aria-label="Notifications"
            className="text-slate-600 hover:text-slate-900 relative transition-colors p-1.5 rounded-full hover:bg-[#EFEFEA]"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {hasUnreadNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-white ring-1 ring-red-400" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-[#E5E2DC] shadow-lg py-3 z-30 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-[#ECEAE4] flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[10px] text-slate-500">Recent activity</span>
              </div>
              <div className="divide-y divide-[#F1EFEB] max-h-80 overflow-y-auto">
                {activity.length === 0 ? (
                  <p className="px-4 py-6 text-center text-xs text-slate-500">
                    No activity yet.
                  </p>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="px-4 py-3 hover:bg-[#FAF9F6]">
                      <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                      <span className="text-[11px] text-slate-400">{timeAgo(item.createdAt)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Area: Admin Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#244E41]/20 rounded-full"
            aria-label="User profile menu"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D5D0C7] ring-1 ring-slate-200">
              <img
                alt={admin?.name ?? "Admin"}
                className="w-full h-full object-cover"
                src={admin?.avatarUrl}
              />
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-[#E5E2DC] shadow-lg py-2 z-30 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2.5 border-b border-[#ECEAE4]">
                <p className="text-xs font-semibold text-slate-800">
                  {admin?.name ?? "Admin"}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {admin?.email}
                </p>
                <span className="inline-block mt-1 text-[10px] font-semibold bg-[#DCEEE3] text-[#225743] px-1.5 py-0.5 rounded">
                  {admin?.role}
                </span>
              </div>
              <button
                onClick={() => {
                  navigateTo('settings');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#FAF9F6] transition-colors"
              >
                Settings & Preferences
              </button>
              <div className="border-t border-[#ECEAE4] mt-1 pt-1">
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
