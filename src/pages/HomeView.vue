<template>
  <div class="space-y-8">
    <HeroSection
      :product-count="products.length"
      :category-count="categories.length"
      :average-rating="averageRating"
      :active-hero-filter="activeHeroFilter"
      @filter-new-arrivals="applyNewArrivalsFilter"
      @filter-sale="applySaleFilter"
    />
    <StatsStrip :stats="stats" />

    <FilterToolbar
      :search="search"
      :categories="categories"
      :selected-category="selectedCategory"
      :sort-by="sortBy"
      :sale-only="saleOnly"
      :in-stock-only="inStockOnly"
      @update:search="search = $event"
      @update:selected-category="selectedCategory = $event"
      @update:sort-by="sortBy = $event as ProductSort"
      @update:sale-only="handleSaleOnlyChange($event)"
      @update:in-stock-only="inStockOnly = $event"
    />

    <section class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500 dark:text-cyan-300">Catalog results</p>
        <h3 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {{ filteredProducts.length }} product<span v-if="filteredProducts.length !== 1">s</span> ready for launch
        </h3>
      </div>
      <div class="rounded-2xl glass-panel px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
        {{ activeSummary }}
      </div>
    </section>

    <section v-if="loading" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="card in 6" :key="card" class="animate-pulse rounded-[1.75rem] glass-panel p-5">
        <div class="aspect-[4/3] rounded-[1.5rem] bg-slate-300/40 dark:bg-slate-700/30"></div>
        <div class="mt-5 h-4 w-24 rounded-full bg-slate-300/30 dark:bg-slate-700/30"></div>
        <div class="mt-3 h-7 w-4/5 rounded-full bg-slate-300/30 dark:bg-slate-700/30"></div>
        <div class="mt-3 h-4 w-full rounded-full bg-slate-300/30 dark:bg-slate-700/30"></div>
        <div class="mt-2 h-4 w-3/4 rounded-full bg-slate-300/30 dark:bg-slate-700/30"></div>
      </div>
    </section>

    <EmptyState
      v-else-if="error"
      title="Unable to retrieve the constellation"
      :description="error"
      icon="⚠"
    >
      <button type="button" class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950" @click="loadData">
        Retry data fetch
      </button>
    </EmptyState>

    <EmptyState
      v-else-if="!filteredProducts.length"
      title="No matching products found"
      description="Try expanding your search, switching category sectors, or disabling one of the quick filters."
      icon="◎"
    />

    <section v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import HeroSection from '../components/HeroSection.vue';
import StatsStrip from '../components/StatsStrip.vue';
import FilterToolbar from '../components/FilterToolbar.vue';
import ProductCard from '../components/ProductCard.vue';
import EmptyState from '../components/EmptyState.vue';
import { getAllProducts, getCategories } from '../services/dummyJson';
import { useFavoritesStore } from '../stores/favorites';
import type { Product, ProductCategory, ProductSort } from '../types';
import { formatCompactNumber, toTitleCase } from '../utils/format';

const products = ref<Product[]>([]);
const categories = ref<ProductCategory[]>([]);
const loading = ref(true);
const error = ref('');
const search = ref('');
const selectedCategory = ref('all');
const sortBy = ref<ProductSort>('featured');
const saleOnly = ref(false);
const inStockOnly = ref(false);
const newArrivalsOnly = ref(false);
const activeHeroFilter = ref<'new-arrivals' | 'sale' | null>(null);
const favoritesStore = useFavoritesStore();

const newArrivalCutoff = computed(() => {
  if (!products.value.length) {
    return 0;
  }

  const timestamps = products.value
    .map((product) => new Date(product.meta.createdAt).getTime())
    .sort((a, b) => b - a);
  const thresholdIndex = Math.max(Math.floor(timestamps.length * 0.35) - 1, 0);

  return timestamps[thresholdIndex] ?? 0;
});

const averageRating = computed(() => {
  if (!products.value.length) {
    return 0;
  }
  const total = products.value.reduce((sum, product) => sum + product.rating, 0);
  return total / products.value.length;
});

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase();
  const result = products.value.filter((product) => {
    const matchesSearch =
      !query ||
      [product.title, product.description, product.brand ?? '', product.category, product.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(query);

    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value;
    const matchesSale = !saleOnly.value || product.discountPercentage > 0;
    const matchesStock = !inStockOnly.value || product.stock > 0;
    const matchesNewArrivals =
      !newArrivalsOnly.value || new Date(product.meta.createdAt).getTime() >= newArrivalCutoff.value;

    return matchesSearch && matchesCategory && matchesSale && matchesStock && matchesNewArrivals;
  });

  switch (sortBy.value) {
    case 'rating':
      return [...result].sort((a, b) => b.rating - a.rating);
    case 'priceAsc':
      return [...result].sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return [...result].sort((a, b) => b.price - a.price);
    case 'name':
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return [...result].sort(
        (a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime(),
      );
    case 'featured':
    default:
      return [...result].sort(
        (a, b) => b.rating * (1 + b.discountPercentage / 100) - a.rating * (1 + a.discountPercentage / 100),
      );
  }
});

const stats = computed(() => [
  {
    label: 'Average product price',
    value: `$${(products.value.reduce((sum, product) => sum + product.price, 0) / Math.max(products.value.length, 1)).toFixed(0)}`,
    hint: 'A quick dashboard metric pulled from the live product dataset.',
  },
  {
    label: 'Wishlist persistence',
    value: formatCompactNumber(favoritesStore.totalFavorites),
    hint: 'Saved favorites remain after reload thanks to localStorage persistence.',
  },
  {
    label: 'Sale-ready products',
    value: formatCompactNumber(products.value.filter((product) => product.discountPercentage > 0).length),
    hint: 'Discount filter instantly isolates products that feel campaign-ready.',
  },
  {
    label: 'In-stock coverage',
    value: `${Math.round((products.value.filter((product) => product.stock > 0).length / Math.max(products.value.length, 1)) * 100)}%`,
    hint: 'Shows how much of the catalog is immediately available to add into cart.',
  },
]);

const activeSummary = computed(() => {
  const categoryText = selectedCategory.value === 'all' ? 'all sectors' : toTitleCase(selectedCategory.value);
  return `Viewing ${categoryText}${newArrivalsOnly.value ? ', new arrivals' : ''}${saleOnly.value ? ', discounted only' : ''}${inStockOnly.value ? ', in-stock only' : ''}${search.value ? `, matching “${search.value}”` : ''}.`;
});

function scrollToCatalog(): void {
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function applyNewArrivalsFilter(): void {
  activeHeroFilter.value = 'new-arrivals';
  newArrivalsOnly.value = true;
  saleOnly.value = false;
  sortBy.value = 'newest';
  scrollToCatalog();
}

function applySaleFilter(): void {
  activeHeroFilter.value = 'sale';
  newArrivalsOnly.value = false;
  saleOnly.value = true;
  sortBy.value = 'priceDesc';
  scrollToCatalog();
}

function handleSaleOnlyChange(value: boolean): void {
  saleOnly.value = value;
  if (value) {
    activeHeroFilter.value = null;
    newArrivalsOnly.value = false;
  }
}

async function loadData(): Promise<void> {
  loading.value = true;
  error.value = '';
  try {
    const [productResponse, categoryResponse] = await Promise.all([getAllProducts(), getCategories()]);
    products.value = productResponse.products;
    categories.value = categoryResponse;
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : 'Unexpected error while fetching product data.';
  } finally {
    loading.value = false;
  }
}


onMounted(() => {
  void loadData();
});
</script>
