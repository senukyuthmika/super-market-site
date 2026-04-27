<template>
  <div class="rounded-[2rem] border border-dashed border-white/20 bg-white/10 p-10 text-center shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:bg-slate-900/30">
    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 text-3xl">
      {{ icon }}
    </div>
    <h3 class="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{{ title }}</h3>
    <p class="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300">{{ description }}</p>
    <div v-if="$slots.default" class="mt-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    description: string;
    icon?: string;
  }>(),
  {
    icon: '✦',
  },
);
</script>
