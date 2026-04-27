<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-white/50 backdrop-blur-2xl dark:bg-slate-950/35">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="group inline-flex items-center gap-3">
        <div class="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-sky-500 text-lg font-black text-white shadow-lg shadow-fuchsia-500/30">
          A
          <span class="absolute inset-0 rounded-2xl border border-white/30"></span>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-500 dark:text-cyan-300">AstraMart</p>
          <h1 class="text-lg font-semibold tracking-tight text-slate-900 transition group-hover:text-fuchsia-600 dark:text-white dark:group-hover:text-cyan-200">
            Neon Commerce Galaxy
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
          class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-0.5 dark:text-slate-100"
          @click="uiStore.openCartDrawer"
        >
          Cart
          <span class="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white dark:bg-white dark:text-slate-950">{{ cartStore.totalItems }}</span>
        </button>

        <button
          v-if="!authStore.isLoggedIn"
          type="button"
          class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:-translate-y-0.5"
          @click="uiStore.openAuthModal"
        >
          Demo Login
        </button>

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
  ? 'inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium !text-black shadow-lg shadow-slate-950/10 dark:bg-white dark:!text-black'
  : 'inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-slate-700 shadow-lg shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white';
}
</script>
