<template>
  <section class="grid gap-8 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-fuchsia-900/10 backdrop-blur-2xl dark:bg-slate-900/35 lg:grid-cols-[1.35fr_0.9fr] lg:p-10">
    <div class="space-y-6">
      <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-200">
        Smart online shopping experience
      </div>

      <div class="space-y-4">
        <p class="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          AstraMart helps customers explore trending products, compare options easily, and enjoy a smooth, modern shopping experience with responsive browsing and detailed product views.
        </p>

        <h2 class="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          Discover products that
          <span class="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
            fit your lifestyle and everyday needs
          </span>.
        </h2>
      </div>

      <div class="flex flex-wrap gap-3">
        <a
          href="#catalog"
          class="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold !text-black shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 dark:bg-white dark:!text-black"
        >
          Explore catalog
        </a>

        <button
          type="button"
          class="inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/5 transition hover:-translate-y-0.5 dark:text-white"
          @click="uiStore.openAuthModal"
        >
          Start shopping
        </button>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <article
          v-for="item in heroHighlights"
          :key="item.label"
          class="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-inner shadow-white/5 dark:bg-slate-950/25"
        >
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.label }}</p>
          <p class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ item.value }}</p>
        </article>
      </div>
    </div>

    <div class="relative isolate flex items-center justify-center rounded-[2rem] border border-white/15 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 p-6 text-white shadow-2xl shadow-violet-950/40">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.28),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(217,70,239,0.32),_transparent_35%)]"></div>

      <div class="relative w-full max-w-md space-y-5">
        <div class="flex items-center justify-between rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Store highlights</p>
            <p class="mt-2 text-2xl font-bold">Fast and reliable shopping</p>
          </div>
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">✦</div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <p class="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Product range</p>
            <p class="mt-2 text-lg font-semibold">Curated catalog</p>
            <p class="mt-2 text-sm text-slate-200/80">
              Browse products across categories with clean visuals, fast discovery, and easy comparison.
            </p>
          </div>

          <div class="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <p class="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Shopping flow</p>
            <p class="mt-2 text-lg font-semibold">Easy purchase journey</p>
            <p class="mt-2 text-sm text-slate-200/80">
              Search, filter, view product details, save favorites, and add items to a persistent cart.
            </p>
          </div>
        </div>

        <div class="rounded-3xl border border-white/15 bg-black/20 p-5 backdrop-blur-xl">
          <div class="flex items-center justify-between text-sm text-slate-200/80">
            <span>Customer-ready experience</span>
            <span>98%</span>
          </div>

          <div class="mt-3 h-3 rounded-full bg-white/10">
            <div class="h-3 w-[98%] rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400"></div>
          </div>

          <p class="mt-3 text-sm text-slate-200/80">
            Includes product discovery, detail pages, favorites, cart persistence, and responsive browsing across devices.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUiStore } from '../stores/ui';

const props = defineProps<{
  productCount: number;
  categoryCount: number;
  averageRating: number;
}>();

const uiStore = useUiStore();

const heroHighlights = computed(() => [
  { label: 'Products available', value: props.productCount.toString() },
  { label: 'Categories to explore', value: props.categoryCount.toString() },
  { label: 'Customer satisfaction', value: props.averageRating.toFixed(1) },
]);
</script>