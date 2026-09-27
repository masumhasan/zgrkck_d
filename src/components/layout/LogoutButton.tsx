import React from 'react';
import { useApp } from '../../context/AppContext';

export interface LogoutButtonProps {
  className?: string;
  onClick?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = '',
  onClick,
}) => {
  const { logout } = useApp();

  const handleLogout = () => {
    if (onClick) {
      onClick();
    } else {
      logout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      type="button"
      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-[#E6E6E0] text-xs font-medium rounded-md transition-colors ${className}`}
      aria-label="Logout"
    >
      <svg
        className="w-4 h-4 text-slate-600 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <span>Logout</span>
    </button>
  );
};
