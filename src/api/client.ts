const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:5000/api/v1';

const TOKEN_KEY = 'mealist_admin_token';

export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage unavailable — session will not persist */
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* noop */
    }
  },
};

export class ApiError extends Error {
  status: number;
  details?: string[];

  constructor(message: string, status: number, details?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;

// The app registers a handler so an expired/revoked session returns to the login screen.
export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null): void => {
  onUnauthorized = handler;
};

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | undefined | null>;
  /** Login-style calls must surface 401 as a normal error instead of logging out. */
  skipAuthRedirect?: boolean;
}

const buildUrl = (path: string, query?: RequestOptions['query']): string => {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

const buildHeaders = (hasBody: boolean): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (hasBody) headers['Content-Type'] = 'application/json';
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const toApiError = async (res: Response): Promise<ApiError> => {
  let message = `Request failed (${res.status})`;
  let details: string[] | undefined;
  try {
    const payload = await res.json();
    if (payload?.message) message = payload.message;
    if (Array.isArray(payload?.details)) details = payload.details;
  } catch {
    /* non-JSON error body */
  }
  return new ApiError(details?.length ? `${message}: ${details.join(', ')}` : message, res.status, details);
};

const send = async (path: string, options: RequestOptions): Promise<Response> => {
  const { method = 'GET', body, query } = options;
  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      headers: buildHeaders(body !== undefined),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Cannot reach the server. Check your connection and try again.', 0);
  }

  if (!res.ok) {
    if (res.status === 401 && !options.skipAuthRedirect) onUnauthorized?.();
    throw await toApiError(res);
  }
  return res;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const res = await send(path, options);
  const payload = await res.json();
  return payload.data as T;
}

export async function requestText(path: string, options: RequestOptions = {}): Promise<string> {
  const res = await send(path, options);
  return res.text();
}
