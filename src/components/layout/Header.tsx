import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserAvatar } from '../shared/UserAvatar';

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
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
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

      {/* Right: Actions and Profile Area */}
      <div className="flex items-center space-x-4 md:space-x-5">
        {headerActions}

        {/* User Area: Admin Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#244E41]/20 rounded-full"
            aria-label="User profile menu"
          >
            <UserAvatar src={admin?.avatarUrl} name={admin?.name ?? 'Admin'} size="md" className="ring-1 ring-slate-200" />
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
