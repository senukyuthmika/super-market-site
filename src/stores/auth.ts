import { defineStore } from 'pinia';
import { getCurrentAuthUser, loginUser } from '../services/dummyJson';
import type { AuthSession, AuthUser } from '../types';
import { readStorage, removeStorage, writeStorage } from '../utils/storage';

const AUTH_KEY = 'astramart.auth';

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
    async login(username: string, password: string): Promise<void> {
      this.loading = true;
      this.error = '';
      try {
        const session = await loginUser({ username, password, expiresInMins: 30 });
        this.setSession(session);
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

      try {
        this.loading = true;
        this.user = await getCurrentAuthUser(this.accessToken);
        this.persist();
      } catch {
        this.logout();
      } finally {
        this.loading = false;
      }
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
