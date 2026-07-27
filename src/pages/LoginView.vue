<template>
  <AuthShell>
    <div class="mx-auto w-full max-w-md space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight text-white">Login</h1>
        <p class="text-sm text-slate-400">Start with a clean, premium account setup.</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <label class="block space-y-2">
          <span class="text-sm text-slate-400">Email</span>
          <input
            v-model.trim="email"
            type="email"
            autocomplete="email"
            placeholder="nova@astramart.space"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

        <label class="block space-y-2">
          <span class="text-sm text-slate-400">Password</span>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

        <p v-if="authStore.error" class="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {{ authStore.error }}
        </p>

        <button
          type="submit"
          class="w-full rounded-2xl bg-sky-400 px-5 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center text-sm text-slate-400">
        <RouterLink to="/register" class="transition hover:text-white">Create Account</RouterLink>
      </p>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AuthShell from '../components/AuthShell.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('nova@astramart.space');
const password = ref('astramart');

async function handleSubmit(): Promise<void> {
  try {
    await authStore.login(email.value, password.value);
    void router.push('/');
  } catch {
    // Error shown from store.
  }
}
</script>
