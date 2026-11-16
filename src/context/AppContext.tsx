import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { AdminProfile, NavItemId } from '../types';
import { authApi } from '../api/auth.api';
import { setUnauthorizedHandler, tokenStore } from '../api/client';

interface AppContextType {
  activeTab: NavItemId;
  selectedUserId: string | null;
  isAuthenticated: boolean;
  /** True while the stored session is being verified on first load. */
  isBootstrapping: boolean;
  admin: AdminProfile | null;
  navigateTo: (tab: NavItemId, userId?: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAdmin: (admin: AdminProfile) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavItemId>('dashboard');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState<boolean>(() => Boolean(tokenStore.get()));

  const logout = useCallback(() => {
    tokenStore.clear();
    setAdmin(null);
    setActiveTab('dashboard');
    setSelectedUserId(null);
  }, []);

  // Restore an existing session; an invalid/expired token falls back to the login page.
  useEffect(() => {
    setUnauthorizedHandler(logout);
    if (!tokenStore.get()) return () => setUnauthorizedHandler(null);

    authApi
      .me()
      .then(setAdmin)
      .catch(() => tokenStore.clear())
      .finally(() => setIsBootstrapping(false));
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login(email, password);
    tokenStore.set(result.token);
    setAdmin(result.admin);
    setActiveTab('dashboard');
  }, []);

  const navigateTo = (tab: NavItemId, userId?: string) => {
    if (userId) setSelectedUserId(userId);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        selectedUserId,
        isAuthenticated: admin !== null,
        isBootstrapping,
        admin,
        navigateTo,
        login,
        logout,
        setAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
