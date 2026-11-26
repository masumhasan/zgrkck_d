export type NavItemId =
  | 'dashboard'
  | 'users'
  | 'user-detail'
  | 'recipes'
  | 'subscription'
  | 'add-plan'
  | 'legal'
  | 'settings';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paged<T> {
  items: T[];
  pagination: Pagination;
}

export type UserStatus = 'Active' | 'Pending' | 'Inactive' | 'Suspended';
export type StoredUserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarUrl: string;
  plan: string;
  planId: string | null;
  status: UserStatus;
  joinedAt: string;
  lastActiveAt: string;
}

export interface UserDetail extends User {
  productActivity: {
    plansGenerated: number;
    mealsPlanned: number;
    pantryItems: number;
    shoppingItems: number;
  };
  usage: {
    aiGenerations: { used: number; limit: number; resetAt: string };
    pantryItems: { used: number };
    shoppingItems: { used: number };
    excludedIngredients: { used: number };
  };
}

export type RecipeStatus = 'Published' | 'Needs Review' | 'Draft';

export interface Recipe {
  id: string;
  code: string;
  title: string;
  cuisine: string;
  status: RecipeStatus;
  updatedAt: string;
  updatedBy: string;
  imageUrl: string;
}

export interface RecipeDetail extends Recipe {
  summary: string;
  mealTypes: string[];
  tags: string[];
  difficulty: string;
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes: number;
  servings: number;
  allergens: string[];
  ingredients: string[];
  steps: string[];
}

export interface NewRecipeInput {
  title: string;
  cuisine: string;
  status: RecipeStatus;
  imageUrl?: string;
  summary?: string;
  mealType: string;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: string[];
  steps: string[];
}

export type PlanBillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';
export type PlanStatus = 'Active' | 'Draft' | 'Hidden';

export interface SubscriptionPlan {
  id: string;
  name: string;
  cycle: PlanBillingCycle;
  price: number;
  description: string;
  userCount: number;
  status: PlanStatus;
  iconType: 'leaf' | 'calendar' | 'award';
  aiLimit: number;
  recipeLimit: string;
  features: string[];
  isDefault: boolean;
}

export type PlanInput = Omit<SubscriptionPlan, 'id' | 'userCount' | 'isDefault'>;

// REQ-SAFE-13: counts over the last `days` days, zeros included
export interface SafetyReport {
  days: number;
  allergen_block: number;
  floor_trigger: number;
  escalation: number;
}

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  createdAt: string;
}

export interface DashboardOverview {
  totalUsers: number;
  totalRecipes: number;
  totalSubscribers: number;
  monthlyRevenue: number;
  activeUsers: number;
  newThisWeek: number;
  recentUsers: User[];
}

export interface UsageOverview {
  mealPlansThisMonth: number;
  mealPlansTotal: number;
  usersGeneratingThisMonth: number;
  totalUsers: number;
  pantryItems: number;
  shoppingItems: number;
  monthlyRunRate: number;
  subscribers: number;
}

export interface AdminNotifications {
  safetyAlerts: boolean;
  recipeReviewAlerts: boolean;
  systemAlerts: boolean;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  notifications: AdminNotifications;
}
