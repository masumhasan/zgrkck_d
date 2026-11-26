import { request } from './client';

export interface NutritionRun {
  state: 'running' | 'done' | 'failed';
  startedAt: string;
  finishedAt: string | null;
  message: string;
  error: string | null;
  usda: { srLegacy: number; foundation: number };
  recipes: { total: number; complete: number; estimated: number; none: number; hidden: number };
}

export interface PendingNutritionChange {
  recipeId: string;
  title: string;
  kcalWas: number;
  kcalNow: number;
  changePct: number;
}

export interface NutritionStatus {
  run: NutritionRun | null;
  pending: PendingNutritionChange[];
}

export const nutritionApi = {
  status: () => request<NutritionStatus>('/admin/nutrition/status'),

  refresh: () => request<{ started: boolean }>('/admin/nutrition/refresh', { method: 'POST' }),

  approve: (recipeId: string) =>
    request<{ approved: boolean }>(`/admin/nutrition/pending/${encodeURIComponent(recipeId)}/approve`, {
      method: 'POST',
    }),
};
