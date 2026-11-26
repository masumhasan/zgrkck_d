import { request } from './client';

export interface LegalPayload {
  lastUpdated: string;
  disclaimer: string;
  terms: string;
  privacy: string;
}

export const legalApi = {
  get: () => request<LegalPayload>('/legal'),
  save: (body: Pick<LegalPayload, 'disclaimer' | 'terms' | 'privacy'>) =>
    request<LegalPayload>('/admin/dashboard/legal', { method: 'PATCH', body }),
};
