<template>
  <section
    class="relative isolate min-h-[34rem] overflow-hidden rounded-[2rem] border border-slate-900/10 shadow-2xl shadow-slate-900/10 dark:border-white/20 dark:shadow-fuchsia-900/10 sm:min-h-[36rem] lg:min-h-[38rem]"
  >
    <img
      :src="heroSceneUrl"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full scale-105 object-cover object-[center_42%] opacity-90 dark:opacity-95"
    />

    <!-- Light mode overlay -->
    <div
      class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/88 via-white/55 to-white/20 dark:hidden"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-white/80 to-transparent dark:hidden"
      aria-hidden="true"
    ></div>

    <!-- Dark mode overlay -->
    <div
      class="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-[#120a22]/92 via-[#120a22]/50 to-[#120a22]/25 dark:block"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-44 bg-gradient-to-t from-[#120a22]/80 to-transparent dark:block"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 grid min-h-[inherit] lg:grid-cols-[1.55fr_0.85fr]">
      <div class="flex flex-col p-6 lg:p-10">
        <div class="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-700 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200">
          Smart online shopping
        </div>

        <div class="mt-5 max-w-xl space-y-4">
          <p class="text-sm leading-7 text-slate-700 dark:text-white/85">
            Shop smarter with a smooth, modern experience. Explore top products, compare options easily, and view detailed product information before you buy.
          </p>

          <h2 class="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.15rem]">
            Discover products that fit your lifestyle and everyday needs.
          </h2>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <a
            href="#catalog"
            class="inline-flex items-center rounded-2xl border border-slate-900/15 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/35 dark:bg-black/25 dark:text-white dark:shadow-lg dark:shadow-slate-950/10 dark:hover:bg-black/35"
          >
            Explore catalog
          </a>

          <button
            type="button"
            class="inline-flex items-center rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5"
            @click="router.push('/login')"
          >
            Start Shopping
          </button>
        </div>

        <div class="mt-auto grid gap-3 rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-black/35 dark:shadow-none sm:grid-cols-3">
          <article v-for="item in heroHighlights" :key="item.label" class="min-w-0">
            <p class="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300/80">{{ item.label }}</p>
            <p class="mt-1 text-xl font-black text-slate-900 dark:text-white">{{ item.value }}</p>
          </article>
        </div>
      </div>

      <aside
        class="relative z-20 m-4 flex min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-violet-300/40 bg-gradient-to-br from-violet-400/90 via-fuchsia-500/85 to-indigo-600/90 text-white shadow-2xl shadow-violet-500/25 backdrop-blur-md dark:border-white/20 dark:from-violet-500/90 dark:via-fuchsia-700/85 dark:to-indigo-950/90 dark:shadow-violet-950/50 lg:m-5 lg:min-h-0 lg:self-stretch"
      >
        <p class="relative z-10 px-10 pt-7 text-2xl font-bold leading-snug drop-shadow-md">
          Fast and reliable shopping
        </p>

        <img
          :src="featureShopperUrl"
          alt="Shopper celebrating with bags"
          class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[center_28%]"
        />
        <div
          class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-violet-900/20 via-transparent to-indigo-900/70 dark:from-violet-900/35 dark:to-indigo-950/75"
          aria-hidden="true"
        ></div>

        <div class="absolute bottom-20 left-4 z-20 flex gap-36 sm:bottom-24 sm:left-5">
          <button
            type="button"
            class="h-20 w-26 overflow-hidden rounded-xl shadow-lg ring-2 ring-transparent transition hover:-translate-y-0.5 hover:ring-white/60 focus:outline-none focus-visible:ring-white"
            :class="activeHeroFilter === 'new-arrivals' ? 'ring-white/80' : ''"
            aria-label="Filter new product arrivals"
            @click="emit('filter-new-arrivals')"
          >
            <img :src="newArrivalBadgeUrl" alt="" class="h-full w-full object-cover" />
          </button>

          <button
            type="button"
            class="h-20 w-26 overflow-hidden rounded-xl shadow-lg ring-2 ring-transparent transition hover:-translate-y-0.5 hover:ring-white/60 focus:outline-none focus-visible:ring-white"
            :class="activeHeroFilter === 'sale' ? 'ring-white/80' : ''"
            aria-label="Filter sale products"
            @click="emit('filter-sale')"
          >
            <img :src="saleBadgeUrl" alt="" class="h-full w-full object-cover" />
          </button>
        </div>

        <div class="relative z-10 mt-auto px-6 pb-6 pt-28">
          <div class="flex items-center justify-between text-sm text-white/90">
            <span>Customer Satisfaction</span>
            <span>98%</span>
          </div>
          <div class="mt-2 h-1.5 rounded-full bg-white/25">
            <div class="h-1.5 w-[98%] rounded-full bg-gradient-to-r from-sky-400 to-cyan-300"></div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  productCount: number;
  categoryCount: number;
  averageRating: number;
  activeHeroFilter?: 'new-arrivals' | 'sale' | null;
}>();

const emit = defineEmits<{
  'filter-new-arrivals': [];
  'filter-sale': [];
}>();

const heroSceneUrl = '/assets/hero-scene.png';
const featureShopperUrl = '/assets/feature-shopper.jpg';
const newArrivalBadgeUrl = '/assets/badge-new-arrival.jpg';
const saleBadgeUrl = '/assets/badge-sale-50.jpg';

const router = useRouter();

const heroHighlights = computed(() => [
  { label: 'Products available', value: props.productCount.toString() },
  { label: 'Filterable categories', value: props.categoryCount.toString() },
  { label: 'Average rating', value: props.averageRating.toFixed(1) },
]);
</script>
