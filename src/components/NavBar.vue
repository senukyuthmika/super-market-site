<template>
  <header class="sticky top-0 z-40 border-b border-slate-900/10 bg-white/80 shadow-sm shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:shadow-slate-950/30">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="group inline-flex items-center gap-3">
        <img src="/assets/logo.png" alt="AstraMart logo" class="h-12 w-auto object-contain" />
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-violet-600 dark:text-cyan-300">AstraMart</p>
          <h1 class="text-lg font-semibold tracking-tight text-slate-900 transition group-hover:text-violet-700 dark:text-white dark:group-hover:text-cyan-200">
            Commerce Galaxy
          </h1>
        </div>
      </RouterLink>

      <nav class="flex flex-1 flex-wrap items-center justify-end gap-3">
        <RouterLink :class="linkClasses('/')" to="/">Discover</RouterLink>
        <RouterLink :class="linkClasses('/favorites')" to="/favorites">
          Favorites
          <span class="rounded-full bg-fuchsia-500/15 px-2 py-0.5 text-xs text-fuchsia-600 dark:text-cyan-300">{{ favoritesStore.totalFavorites }}</span>
        </RouterLink>

        <ThemeToggle />

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-slate-100 dark:shadow-lg dark:shadow-slate-950/5"
          @click="uiStore.openCartDrawer"
        >
          Cart
          <span class="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white dark:bg-white dark:text-slate-950">{{ cartStore.totalItems }}</span>
        </button>

        <RouterLink
          v-if="!authStore.isLoggedIn"
          to="/login"
          class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5"
        >
          Login
        </RouterLink>

        <div v-else class="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 shadow-lg shadow-slate-950/5 backdrop-blur-xl">
          <img :src="authStore.user?.image" :alt="authStore.displayName" class="h-10 w-10 rounded-xl object-cover" />
          <div class="hidden text-sm sm:block">
            <p class="font-semibold text-slate-900 dark:text-white">{{ authStore.displayName }}</p>
            <p class="text-slate-500 dark:text-slate-400">JWT session active</p>
          </div>
          <button
            type="button"
            class="rounded-xl border border-white/20 px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-700 transition hover:bg-white/10 dark:text-slate-200"
            @click="authStore.logout"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import { useFavoritesStore } from '../stores/favorites';
import { useUiStore } from '../stores/ui';

const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const uiStore = useUiStore();

function linkClasses(path: string): string {
  const isActive = route.path === path;
  return isActive
  ? 'inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/15 dark:bg-white dark:!text-slate-950'
  : 'inline-flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 dark:border-white/20 dark:bg-white/10 dark:text-slate-200 dark:shadow-lg dark:shadow-slate-950/5 dark:hover:text-white';
}
</script>
