<template>
  <AuthShell>
    <div class="mx-auto w-full max-w-md space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight text-white">Create Account</h1>
        <p class="text-sm text-slate-400">Start with a clean, premium account setup.</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <label class="block space-y-2">
          <span class="text-sm text-slate-400">Name</span>
          <input
            v-model.trim="name"
            type="text"
            autocomplete="name"
            placeholder="nova alex"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

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
            autocomplete="new-password"
            placeholder="••••••••"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

        <label class="block space-y-2">
          <span class="text-sm text-slate-400">Confirm Password</span>
          <input
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="••••••••"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

        <p v-if="error" class="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {{ error }}
        </p>

        <p v-if="success" class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {{ success }}
        </p>

        <button
          type="submit"
          class="w-full rounded-2xl bg-sky-400 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="submitting"
        >
          {{ submitting ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <p class="text-center text-sm text-slate-400">
        Already have an account?
        <RouterLink to="/login" class="transition hover:text-white">Login</RouterLink>
      </p>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AuthShell from '../components/AuthShell.vue';

const router = useRouter();

const name = ref('nova alex');
const email = ref('nova@astramart.space');
const password = ref('astramart');
const confirmPassword = ref('astramart');
const error = ref('');
const success = ref('');
const submitting = ref(false);

async function handleSubmit(): Promise<void> {
  error.value = '';
  success.value = '';

  if (!name.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  submitting.value = true;
  await new Promise((resolve) => window.setTimeout(resolve, 600));
  submitting.value = false;

  success.value = 'Account created. You can now log in with your credentials.';
  window.setTimeout(() => {
    void router.push('/login');
  }, 900);
}
</script>
