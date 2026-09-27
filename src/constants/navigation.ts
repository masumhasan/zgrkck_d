import type { NavItemId } from '../types';

export interface NavItemConfig {
  id: NavItemId;
  label: string;
  icon: string;
}

export const MAIN_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'users',
  },
  {
    id: 'recipes',
    label: 'Recipes',
    icon: 'recipes',
  },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: 'subscription',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
  },
];
