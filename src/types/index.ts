export type NavItemId =
  | 'dashboard'
  | 'users'
  | 'user-detail'
  | 'recipes'
  | 'subscription'
  | 'add-plan'
  | 'settings';

export type UserStatus = 'Active' | 'Pending' | 'Inactive' | 'Suspended';
export type UserPlan = 'Free' | 'Plus' | 'Pro';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  plan: UserPlan;
  status: UserStatus;
  joinedDate: string;
  lastActive: string;
  productActivity: {
    plansGenerated: number;
    mealsCooked: number;
    recipesSaved: number;
    recipesImported: number;
  };
  usage: {
    aiGenerations: {
      used: number;
      limit: number;
      resetDate: string;
    };
    savedRecipes: {
      used: number;
      limit: string;
    };
    importedRecipes: {
      used: number;
      limit: number;
    };
    customIngredients: {
      used: number;
      limit: number;
    };
  };
}

export type RecipeStatus = 'Published' | 'Needs Review' | 'Draft';

export interface Recipe {
  id: string;
  code: string;
  title: string;
  cuisine: string;
  status: RecipeStatus;
  lastUpdated: string;
  updatedBy: string;
  imageUrl: string;
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
}

export interface RecentActivityItem {
  id: string;
  title: string;
  timeAgo: string;
}

export interface AdminSettings {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  notifications: {
    safetyAlerts: boolean;
    recipeReviewAlerts: boolean;
    systemAlerts: boolean;
  };
}
