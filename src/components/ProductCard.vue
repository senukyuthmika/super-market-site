<template>
  <article
    class="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 shadow-xl shadow-slate-950/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:shadow-fuchsia-500/10 dark:bg-slate-900/35"
    @click="goToDetail"
  >
    <div class="relative overflow-hidden">
      <div class="block aspect-[4/3] overflow-hidden bg-slate-950/10">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div class="absolute left-4 top-4 flex items-center gap-2">
        <span class="rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-xl">
          {{ formattedCategory }}
        </span>
        <span class="rounded-full bg-fuchsia-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/20">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
      </div>

      <button
        type="button"
        class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur-xl transition hover:scale-105"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Save to favorites'"
        @click.stop="favoritesStore.toggle(product)"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.8">
          <path d="M12 20.25s-7.5-4.35-7.5-10.35a4.5 4.5 0 0 1 8-2.78A4.5 4.5 0 0 1 19.5 9.9c0 6-7.5 10.35-7.5 10.35Z"></path>
        </svg>
      </button>
    </div>

    <div class="space-y-4 p-5">
      <div class="space-y-2">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ product.brand ?? 'Astra Select' }}</p>
            <h3 class="line-clamp-2 text-xl font-bold tracking-tight text-slate-950 transition group-hover:text-fuchsia-600 dark:text-white dark:group-hover:text-cyan-300">
              {{ product.title }}
            </h3>
          </div>
          <div class="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-right text-sm font-semibold text-amber-700 dark:text-amber-200">
            <div>★ {{ product.rating.toFixed(1) }}</div>
            <div class="text-xs font-normal">{{ product.reviews.length }} reviews</div>
          </div>
        </div>
        <p class="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ product.description }}</p>
      </div>

      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Launch price</p>
          <div class="mt-2 flex items-center gap-2">
            <p class="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{{ formatCurrency(discountedAmount) }}</p>
            <p class="text-sm text-slate-400 line-through">{{ formatCurrency(product.price) }}</p>
          </div>
        </div>

        <button
          type="button"
          class="inline-flex items-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          @click.stop="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '../types';
import { discountedPrice, formatCurrency, toTitleCase } from '../utils/format';
import { useCartStore } from '../stores/cart';
import { useFavoritesStore } from '../stores/favorites';
import { useUiStore } from '../stores/ui';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const uiStore = useUiStore();

const discountedAmount = computed(() =>
  discountedPrice(props.product.price, props.product.discountPercentage),
);
const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id));
const formattedCategory = computed(() => toTitleCase(props.product.category));

function addToCart(): void {
  cartStore.addProduct(props.product);
  uiStore.openCartDrawer();
}

function goToDetail(): void {
  void router.push(`/product/${props.product.id}`);
}
</script>