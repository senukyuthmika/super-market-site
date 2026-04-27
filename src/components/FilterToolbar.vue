<template>
  <section id="catalog" class="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:bg-slate-900/30">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500 dark:text-cyan-300">Mission controls</p>
        <h3 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Search, filter, and sort the galaxy</h3>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 lg:w-[32rem]">
        <label class="group relative block">
          <span class="sr-only">Search products</span>
          <input
            :value="search"
            type="search"
            placeholder="Search by title, brand, tag, or category"
            class="w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400 focus:bg-white/30 dark:text-white dark:placeholder:text-slate-400"
            @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
          />
          <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">⌕</span>
        </label>

        <select
          :value="sortBy"
          class="rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-fuchsia-400 focus:bg-white/30 dark:text-white"
          @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
        >
          <option value="featured">Featured orbit</option>
          <option value="rating">Highest rating</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-3">
      <button
        type="button"
        :class="chipClasses(selectedCategory === 'all')"
        @click="$emit('update:selectedCategory', 'all')"
      >
        All sectors
      </button>
      <button
        v-for="category in categories"
        :key="category.slug"
        type="button"
        :class="chipClasses(selectedCategory === category.slug)"
        @click="$emit('update:selectedCategory', category.slug)"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="mt-5 flex flex-wrap gap-3">
      <label class="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
        <input
          :checked="saleOnly"
          type="checkbox"
          class="h-4 w-4 rounded border-white/20 accent-fuchsia-600"
          @change="$emit('update:saleOnly', ($event.target as HTMLInputElement).checked)"
        />
        Show only discounted items
      </label>
      <label class="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
        <input
          :checked="inStockOnly"
          type="checkbox"
          class="h-4 w-4 rounded border-white/20 accent-cyan-500"
          @change="$emit('update:inStockOnly', ($event.target as HTMLInputElement).checked)"
        />
        In-stock products only
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductCategory, ProductSort } from '../types';

defineProps<{
  search: string;
  categories: ProductCategory[];
  selectedCategory: string;
  sortBy: ProductSort;
  saleOnly: boolean;
  inStockOnly: boolean;
}>();

defineEmits<{
  'update:search': [value: string];
  'update:selectedCategory': [value: string];
  'update:sortBy': [value: string];
  'update:saleOnly': [value: boolean];
  'update:inStockOnly': [value: boolean];
}>();

function chipClasses(isActive: boolean): string {
  return isActive
    ? 'rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950'
    : 'rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white';
}
</script>
