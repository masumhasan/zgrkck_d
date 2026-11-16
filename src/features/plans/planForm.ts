import type { PlanBillingCycle, PlanStatus } from '../../types';

export const PLAN_FEATURES = [
  'Cook Mode',
  'Ad-free Experience',
  'Nutrition AI Insights',
  'Priority Support',
];

export interface PlanFormState {
  name: string;
  cycle: PlanBillingCycle;
  description: string;
  price: string;
  aiLimit: string;
  recipeLimit: string;
  status: PlanStatus;
  features: string[];
}

export const emptyPlanForm: PlanFormState = {
  name: '',
  cycle: 'Monthly',
  description: '',
  price: '',
  aiLimit: '5000',
  recipeLimit: 'Unlimited',
  status: 'Draft',
  features: ['Cook Mode', 'Ad-free Experience'],
};
