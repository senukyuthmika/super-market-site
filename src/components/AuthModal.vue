<template>
  <div v-if="uiStore.isAuthModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <button type="button" class="absolute inset-0 bg-slate-950/60 backdrop-blur-md" @click="uiStore.closeAuthModal"></button>
    <div class="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/85 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-2xl dark:bg-slate-950/85">
      <div class="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
        <div class="bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 p-8 text-white">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/80">DummyJWT access</p>
          <h3 class="mt-4 text-3xl font-black tracking-tight">Log into the command deck.</h3>
          <p class="mt-4 text-sm leading-7 text-slate-200/80">
            This modal simulates authentication using DummyJSON's auth endpoint and stores the returned JWT tokens in localStorage.
          </p>
          <div class="mt-6 space-y-3 rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
            <p class="text-sm font-semibold text-cyan-200">Demo credentials</p>
            <p class="text-sm text-slate-200/80"><span class="font-semibold">Username:</span> emilys</p>
            <p class="text-sm text-slate-200/80"><span class="font-semibold">Password:</span> emilyspass</p>
          </div>
        </div>

        <form class="space-y-5 p-8" @submit.prevent="handleSubmit">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500 dark:text-cyan-300">Authentication simulation</p>
            <h4 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Acquire your access token</h4>
          </div>

          <label class="block space-y-2">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Username</span>
            <input v-model.trim="username" type="text" class="w-full rounded-2xl border border-white/20 bg-white/30 px-4 py-3 text-sm outline-none transition focus:border-fuchsia-400 dark:bg-slate-900/50" placeholder="emilys" />
          </label>

          <label class="block space-y-2">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Password</span>
            <input v-model.trim="password" type="password" class="w-full rounded-2xl border border-white/20 bg-white/30 px-4 py-3 text-sm outline-none transition focus:border-fuchsia-400 dark:bg-slate-900/50" placeholder="emilyspass" />
          </label>

          <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
            Tokens persist between refreshes. Logout clears the local session.
          </div>

          <p v-if="authStore.error" class="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-200">{{ authStore.error }}</p>

          <div class="flex flex-wrap gap-3">
            <button type="submit" class="inline-flex items-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20" :disabled="authStore.loading">
              {{ authStore.loading ? 'Authorizing...' : 'Login and store JWT' }}
            </button>
            <button type="button" class="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/10 dark:text-slate-200" @click="fillDemoCredentials">
              Use demo credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useUiStore } from '../stores/ui';

const authStore = useAuthStore();
const uiStore = useUiStore();
const username = ref('emilys');
const password = ref('emilyspass');

function fillDemoCredentials(): void {
  username.value = 'emilys';
  password.value = 'emilyspass';
}

async function handleSubmit(): Promise<void> {
  try {
    await authStore.login(username.value, password.value);
    uiStore.closeAuthModal();
  } catch {
    // Error state is shown from the store.
  }
}
</script>
