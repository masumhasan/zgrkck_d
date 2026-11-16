import { request } from './client';
import type { NewRecipeInput, Paged, Recipe, RecipeDetail, RecipeStatus } from '../types';

export interface RecipeListQuery {
  search?: string;
  status?: string;
  cuisine?: string;
  page?: number;
  limit?: number;
}

export const recipesApi = {
  list: (q: RecipeListQuery) =>
    request<Paged<Recipe>>('/admin/recipes', {
      query: {
        search: q.search,
        status: q.status && q.status !== 'All' ? q.status : undefined,
        cuisine: q.cuisine && q.cuisine !== 'All' ? q.cuisine : undefined,
        page: q.page,
        limit: q.limit,
      },
    }),

  cuisines: () => request<string[]>('/admin/recipes/cuisines'),

  get: (id: string) => request<RecipeDetail>(`/admin/recipes/${id}`),

  create: (input: NewRecipeInput) =>
    request<RecipeDetail>('/admin/recipes', { method: 'POST', body: input }),

  setStatus: (id: string, status: RecipeStatus) =>
    request<RecipeDetail>(`/admin/recipes/${id}/status`, { method: 'PATCH', body: { status } }),

  remove: (id: string) => request<{ deleted: boolean }>(`/admin/recipes/${id}`, { method: 'DELETE' }),
};
