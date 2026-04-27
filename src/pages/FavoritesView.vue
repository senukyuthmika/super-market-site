<template>
  <section class="space-y-8">
    <header class="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:bg-slate-900/30 lg:p-8">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500 dark:text-cyan-300">Bookmarks</p>
      <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-950 dark:text-white">Your saved constellation</h1>
      <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        AstraMart keeps favorite products across page reloads using a persistent Pinia-powered bookmark store. Tap any card to jump into its dynamic route detail view.
      </p>
    </header>

    <EmptyState
      v-if="!favoriteProducts.length"
      title="No favorites saved yet"
      description="Heart a few products from the home catalog and they will appear here instantly."
      icon="♡"
    >
      <RouterLink to="/" class="inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 dark:bg-white dark:text-slate-950">
        Browse products
      </RouterLink>
    </EmptyState>

    <section v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="item in favoriteProducts"
        :key="item.id"
        class="group overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 shadow-xl shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-1 dark:bg-slate-900/30"
      >
        <RouterLink :to="`/product/${item.id}`" class="block aspect-[4/3] overflow-hidden">
          <img :src="item.thumbnail" :alt="item.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </RouterLink>
        <div class="space-y-4 p-5">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.brand ?? 'Astra Select' }}</p>
              <RouterLink :to="`/product/${item.id}`" class="text-xl font-bold tracking-tight text-slate-950 transition group-hover:text-fuchsia-600 dark:text-white dark:group-hover:text-cyan-300">
                {{ item.title }}
              </RouterLink>
            </div>
            <span class="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-semibold text-amber-700 dark:text-amber-200">★ {{ item.rating.toFixed(1) }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ toTitleCase(item.category) }}</p>
              <p class="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{{ formatCurrency(discountedPrice(item.price, item.discountPercentage)) }}</p>
            </div>
            <button type="button" class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-rose-500 transition hover:-translate-y-0.5" @click="removeFavorite(item.id)">
              Remove
            </button>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import EmptyState from '../components/EmptyState.vue';
import { useFavoritesStore } from '../stores/favorites';
import { discountedPrice, formatCurrency, toTitleCase } from '../utils/format';

const favoritesStore = useFavoritesStore();
const favoriteProducts = computed(() => favoritesStore.items);

function removeFavorite(productId: number): void {
  favoritesStore.remove(productId);
}
</script>
