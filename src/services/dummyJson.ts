import type { AuthSession, LoginPayload, Product, ProductCategory, ProductListResponse } from '../types';

const API_BASE = 'https://dummyjson.com';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = 'Something went wrong while contacting DummyJSON.';
    try {
      const errorPayload = (await response.json()) as { message?: string };
      if (errorPayload.message) {
        message = errorPayload.message;
      }
    } catch {
      // Keep fallback message.
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function getAllProducts(): Promise<ProductListResponse> {
  return request<ProductListResponse>('/products?limit=0');
}

export function getProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

export function getProductsByCategory(category: string): Promise<ProductListResponse> {
  return request<ProductListResponse>(`/products/category/${category}`);
}

export function getCategories(): Promise<ProductCategory[]> {
  return request<ProductCategory[]>('/products/categories');
}

export function loginUser(payload: LoginPayload): Promise<AuthSession> {
  return request<AuthSession>('/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
      expiresInMins: payload.expiresInMins ?? 30,
    }),
  });
}

export function getCurrentAuthUser(accessToken: string): Promise<Omit<AuthSession, 'accessToken' | 'refreshToken'>> {
  return request<Omit<AuthSession, 'accessToken' | 'refreshToken'>>('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });
}
