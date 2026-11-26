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
import { LegalPage } from './pages/LegalPage';
import { PublicLegalPage } from './pages/PublicLegalPage';
import { LoadingBlock } from './components/shared/StatusViews';

const AppContent: React.FC = () => {
  const { isAuthenticated, isBootstrapping, activeTab } = useApp();

  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <LoadingBlock label="Restoring your session…" />
      </div>
    );
  }

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
    case 'legal':
      return <LegalPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
};

export function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/terms') return <PublicLegalPage mode="terms" />;
  if (path === '/privacy') return <PublicLegalPage mode="privacy" />;

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
