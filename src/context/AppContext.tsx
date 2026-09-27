import React, { createContext, useContext, useState } from 'react';
import type {
  NavItemId,
  User,
  Recipe,
  SubscriptionPlan,
  AdminSettings,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_RECIPES,
  INITIAL_PLANS,
  INITIAL_SETTINGS,
} from '../constants/mockData';

interface AppContextType {
  activeTab: NavItemId;
  selectedUserId: string;
  isAuthenticated: boolean;
  users: User[];
  recipes: Recipe[];
  plans: SubscriptionPlan[];
  settings: AdminSettings;
  searchQuery: string;
  hasUnreadNotification: boolean;
  navigateTo: (tab: NavItemId, userId?: string) => void;
  login: () => void;
  logout: () => void;
  setSearchQuery: (query: string) => void;
  markNotificationsAsRead: () => void;
  toggleUserStatus: (userId: string) => void;
  suspendUser: (userId: string) => void;
  addPlan: (newPlan: Omit<SubscriptionPlan, 'id' | 'userCount'>) => void;
  addRecipe: (newRecipe: Omit<Recipe, 'id'>) => void;
  updateSettings: (partial: Partial<AdminSettings>) => void;
  toggleNotificationSetting: (
    key: keyof AdminSettings['notifications']
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<NavItemId>('dashboard');
  const [selectedUserId, setSelectedUserId] = useState<string>('user-1');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [plans, setPlans] = useState<SubscriptionPlan[]>(INITIAL_PLANS);
  const [settings, setSettings] = useState<AdminSettings>(INITIAL_SETTINGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasUnreadNotification, setHasUnreadNotification] =
    useState<boolean>(true);

  const navigateTo = (tab: NavItemId, userId?: string) => {
    if (userId) {
      setSelectedUserId(userId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const markNotificationsAsRead = () => {
    setHasUnreadNotification(false);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        return { ...u, status: newStatus };
      })
    );
  };

  const suspendUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'Suspended' } : u))
    );
  };

  const addPlan = (newPlan: Omit<SubscriptionPlan, 'id' | 'userCount'>) => {
    const plan: SubscriptionPlan = {
      ...newPlan,
      id: `plan-${Date.now()}`,
      userCount: 0,
    };
    setPlans((prev) => [...prev, plan]);
    setActiveTab('subscription');
  };

  const addRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const rec: Recipe = {
      ...newRecipe,
      id: `rec-${Date.now()}`,
    };
    setRecipes((prev) => [rec, ...prev]);
  };

  const updateSettings = (partial: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const toggleNotificationSetting = (
    key: keyof AdminSettings['notifications']
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        selectedUserId,
        isAuthenticated,
        users,
        recipes,
        plans,
        settings,
        searchQuery,
        hasUnreadNotification,
        navigateTo,
        login,
        logout,
        setSearchQuery,
        markNotificationsAsRead,
        toggleUserStatus,
        suspendUser,
        addPlan,
        addRecipe,
        updateSettings,
        toggleNotificationSetting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
