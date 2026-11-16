import { request, requestText } from './client';
import type { Paged, StoredUserStatus, User, UserDetail } from '../types';

export interface UserListQuery {
  search?: string;
  status?: string;
  planId?: string;
  page?: number;
  limit?: number;
}

const toQuery = (q: UserListQuery) => ({
  search: q.search,
  status: q.status && q.status !== 'All' ? q.status : undefined,
  planId: q.planId && q.planId !== 'All' ? q.planId : undefined,
  page: q.page,
  limit: q.limit,
});

export const usersApi = {
  list: (q: UserListQuery) => request<Paged<User>>('/admin/users', { query: toQuery(q) }),

  get: (id: string) => request<UserDetail>(`/admin/users/${id}`),

  setStatus: (id: string, status: StoredUserStatus) =>
    request<User>(`/admin/users/${id}/status`, { method: 'PATCH', body: { status } }),

  setPlan: (id: string, planId: string) =>
    request<User>(`/admin/users/${id}/plan`, { method: 'PATCH', body: { planId } }),

  remove: (id: string) => request<{ deleted: boolean }>(`/admin/users/${id}`, { method: 'DELETE' }),

  exportCsv: (q: UserListQuery) => requestText('/admin/users/export', { query: toQuery(q) }),
};
