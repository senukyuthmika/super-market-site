<template>
  <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="stat in stats"
      :key="stat.label"
      class="rounded-[1.75rem] glass-panel p-5 transition hover:-translate-y-0.5"
    >
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
      <p class="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{{ stat.value }}</p>
      <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ stat.hint }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
interface StatItem {
  label: string;
  value: string;
  hint: string;
}

defineProps<{
  stats: StatItem[];
}>();
</script>
