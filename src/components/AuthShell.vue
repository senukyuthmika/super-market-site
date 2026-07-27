<template>
  <div class="flex min-h-[calc(100vh-3rem)] items-center justify-center px-4 py-8">
    <div class="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 glass-panel-strong shadow-2xl shadow-slate-950/20 dark:shadow-violet-950/30">
      <header class="flex items-center justify-between gap-4 border-b border-slate-900/10 px-6 py-5 dark:border-white/10 sm:px-8">
        <RouterLink to="/" class="group inline-flex items-center gap-3">
          <img src="/assets/logo.png" alt="AstraMart logo" class="h-11 w-auto object-contain" />
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-violet-600 dark:text-cyan-300">AstraMart</p>
            <p class="text-base font-semibold tracking-tight text-slate-900 transition group-hover:text-violet-700 dark:text-white dark:group-hover:text-cyan-200">
              Neon Commerce Galaxy
            </p>
          </div>
        </RouterLink>

        <ThemeToggle />
      </header>

      <div class="grid gap-0 lg:grid-cols-2">
        <div class="relative hidden min-h-[28rem] overflow-hidden bg-violet-200/60 lg:block dark:bg-violet-900/30">
          <img
            :src="authImageUrl"
            alt="Shopper with bags"
            class="h-full w-full object-cover object-[center_20%]"
          />
        </div>

        <div class="flex flex-col justify-center bg-slate-950/90 px-6 py-10 dark:bg-slate-950/95 sm:px-10 sm:py-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const authImageUrl = '/assets/feature-shopper.jpg';
</script>
