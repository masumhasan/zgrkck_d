import { request } from './client';
import type {
  ActivityItem,
  DashboardOverview,
  PlanInput,
  SafetyReport,
  SubscriptionPlan,
  UsageOverview,
} from '../types';

export const plansApi = {
  list: () => request<SubscriptionPlan[]>('/admin/plans'),

  create: (input: PlanInput) =>
    request<SubscriptionPlan>('/admin/plans', { method: 'POST', body: input }),

  update: (id: string, input: Partial<PlanInput>) =>
    request<SubscriptionPlan>(`/admin/plans/${id}`, { method: 'PATCH', body: input }),
};

export const dashboardApi = {
  overview: () => request<DashboardOverview>('/admin/dashboard/overview'),
  usage: () => request<UsageOverview>('/admin/dashboard/usage'),
  safety: () => request<SafetyReport>('/admin/dashboard/safety'),
  activity: (limit = 10) =>
    request<ActivityItem[]>('/admin/dashboard/activity', { query: { limit } }),
};
