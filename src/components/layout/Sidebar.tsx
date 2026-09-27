import React from 'react';
import { useApp } from '../../context/AppContext';
import { MAIN_NAV_ITEMS } from '../../constants/navigation';
import type { NavItemId } from '../../types';
import { Logo } from './Logo';
import { LogoutButton } from './LogoutButton';

export interface SidebarProps {
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenOnMobile = false,
  onCloseMobile,
}) => {
  const { activeTab, navigateTo } = useApp();

  const handleNavClick = (id: NavItemId) => {
    navigateTo(id);
    if (onCloseMobile) onCloseMobile();
  };

  const renderIcon = (id: NavItemId, isActive: boolean) => {
    const iconColor = isActive ? 'text-[#244E41]' : 'text-slate-500';

    switch (id) {
      case 'dashboard':
        return (
          <svg className={`w-4 h-4 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        );
      case 'users':
        return (
          <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'recipes':
        return (
          <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case 'subscription':
        return (
          <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const isNavActive = (id: NavItemId) => {
    if (activeTab === id) return true;
    if (id === 'users' && activeTab === 'user-detail') return true;
    if (id === 'subscription' && activeTab === 'add-plan') return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenOnMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#EFEFEA] border-r border-[#E2DFD7] flex flex-col justify-between p-6 transition-transform duration-200 ease-in-out md:translate-x-0 shrink-0 ${
          isOpenOnMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo & Close Button (Mobile) */}
          <div className="flex items-start justify-between px-2 pt-2">
            <Logo onClick={() => handleNavClick('dashboard')} />
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close navigation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav aria-label="Sidebar Navigation" className="space-y-1.5">
            {MAIN_NAV_ITEMS.map((item) => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                    active
                      ? 'bg-[#DFDFD9] text-[#244E41] font-semibold border-r-2 border-[#244E41]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#E6E6E0]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <div className="flex items-center space-x-3">
                    {renderIcon(item.id, active)}
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section with Single Source of Truth Logout */}
        <div className="pt-6 border-t border-[#E2DFD7]/60">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};
