import { defineStore } from 'pinia';
import type { AuthSession, AuthUser } from '../types';
import { readStorage, removeStorage, writeStorage } from '../utils/storage';

const AUTH_KEY = 'astramart.auth';

const DEMO_EMAIL = 'nova@astramart.space';
const DEMO_PASSWORD = 'astramart';

const DEMO_USER: AuthUser = {
  id: 1,
  username: 'nova',
  email: DEMO_EMAIL,
  firstName: 'Nova',
  lastName: 'Alex',
  gender: 'female',
  image: 'https://i.pravatar.cc/150?u=nova-astramart',
};

interface StoredAuthState {
  user: AuthUser | null;
  accessToken: string;
  refreshToken: string;
}

const initialState = readStorage<StoredAuthState>(AUTH_KEY, {
  user: null,
  accessToken: '',
  refreshToken: '',
});

function createDemoSession(): AuthSession {
  return {
    ...DEMO_USER,
    accessToken: 'demo-access-token',
    refreshToken: 'demo-refresh-token',
  };
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: initialState.user as AuthUser | null,
    accessToken: initialState.accessToken,
    refreshToken: initialState.refreshToken,
    loading: false,
    error: '',
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.accessToken),
    displayName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : 'Guest Explorer'),
  },
  actions: {
    persist(): void {
      writeStorage<StoredAuthState>(AUTH_KEY, {
        user: this.user,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
      });
    },
    setSession(session: AuthSession): void {
      const { accessToken, refreshToken, ...user } = session;
      this.user = user;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.error = '';
      this.persist();
    },
    async login(email: string, password: string): Promise<void> {
      this.loading = true;
      this.error = '';

      try {
        await new Promise((resolve) => window.setTimeout(resolve, 500));

        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
          throw new Error('Invalid email or password. Use nova@astramart.space / astramart.');
        }

        this.setSession(createDemoSession());
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Login failed. Please try again.';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async hydrateProfile(): Promise<void> {
      if (!this.accessToken || this.user) {
        return;
      }

      this.user = DEMO_USER;
      this.persist();
    },
    logout(): void {
      this.user = null;
      this.accessToken = '';
      this.refreshToken = '';
      this.loading = false;
      this.error = '';
      removeStorage(AUTH_KEY);
    },
  },
});
