import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { RecipesPage } from './pages/RecipesPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { AddPlanPage } from './pages/AddPlanPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeTab } = useApp();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  switch (activeTab) {
    case 'dashboard':
      return <DashboardPage />;
    case 'users':
      return <UsersPage />;
    case 'user-detail':
      return <UserDetailPage />;
    case 'recipes':
      return <RecipesPage />;
    case 'subscription':
      return <SubscriptionPage />;
    case 'add-plan':
      return <AddPlanPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
