<template>
  <section class="py-12">
    <EmptyState
      title="Lost in deep space"
      description="The route you requested does not exist. Head back to the home catalog and continue exploring the product galaxy."
      icon="🚀"
    >
      <RouterLink to="/" class="inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 dark:bg-white dark:text-slate-950">
        Return home
      </RouterLink>
    </EmptyState>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import EmptyState from '../components/EmptyState.vue';
</script>
