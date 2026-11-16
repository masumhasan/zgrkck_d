import { request } from './client';
import type { AdminNotifications, AdminProfile } from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; admin: AdminProfile }>('/admin/auth/login', {
      method: 'POST',
      body: { email, password },
      skipAuthRedirect: true,
    }),

  me: () => request<AdminProfile>('/admin/auth/me'),

  updateProfile: (name: string, email: string) =>
    request<AdminProfile>('/admin/auth/profile', { method: 'PATCH', body: { name, email } }),

  updateNotifications: (prefs: Partial<AdminNotifications>) =>
    request<AdminProfile>('/admin/auth/notifications', { method: 'PATCH', body: prefs }),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean }>('/admin/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
    }),

  // Password recovery reuses the shared OTP endpoints (email code → reset).
  requestPasswordReset: (email: string) =>
    request<{ sent: boolean }>('/auth/forgot-password', {
      method: 'POST',
      body: { email },
      skipAuthRedirect: true,
    }),

  resetPassword: (email: string, otp: string, newPassword: string) =>
    request<{ success: boolean }>('/auth/reset-password', {
      method: 'POST',
      body: { email, otp, newPassword },
      skipAuthRedirect: true,
    }),
};
