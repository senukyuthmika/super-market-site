<template>
  <section class="space-y-10">
    <RouterLink
      to="/"
      class="arctic-button arctic-button--ghost"
    >
      ← Back to catalog
    </RouterLink>

    <section v-if="loading" class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="arctic-panel aspect-[4/3] animate-pulse"></div>
      <div class="space-y-4">
        <div class="h-6 w-32 animate-pulse rounded-full bg-white/10"></div>
        <div class="h-16 w-full animate-pulse rounded-[1.5rem] bg-white/10"></div>
        <div class="h-4 w-full animate-pulse rounded-full bg-white/10"></div>
        <div class="h-4 w-5/6 animate-pulse rounded-full bg-white/10"></div>
      </div>
    </section>

    <EmptyState
      v-else-if="error || !product"
      title="Product not found"
      :description="error || 'The requested product could not be loaded.'"
      icon="⚠"
    />

    <template v-else>
      <section class="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <!-- Left: large image + thumbnails -->
        <div class="space-y-5">
          <div class="arctic-panel p-4 md:p-5">
            <img
              :src="activeImage"
              :alt="product.title"
              class="aspect-[4/4.6] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="image in product.images"
              :key="image"
              type="button"
              class="overflow-hidden rounded-[1rem] border transition"
              :class="
                image === activeImage
                  ? 'border-white bg-white/20'
                  : 'border-white/15 bg-white/6 hover:bg-white/10'
              "
              @click="activeImage = image"
            >
              <img
                :src="image"
                :alt="`${product.title} preview`"
                class="aspect-square w-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Right: open layout / editorial info -->
        <div class="flex flex-col justify-between gap-8 py-2">
          <div class="space-y-6">
            <div class="flex flex-wrap items-center gap-3">
              <span class="arctic-label">{{ formattedCategory }}</span>
              <span class="text-sm font-semibold text-white/70">
                ★ {{ product.rating.toFixed(1) }}
              </span>
              <span class="text-sm font-semibold text-white/55">
                {{ product.availabilityStatus }}
              </span>
            </div>

            <div>
              <p class="text-sm uppercase tracking-[0.28em] text-white/40">
                {{ product.brand ?? 'Astra Select' }}
              </p>

              <h1 class="arctic-display mt-3 text-[3.8rem] leading-[0.88] md:text-[5.4rem]">
                {{ product.title }}
              </h1>

              <p class="arctic-body mt-5 max-w-xl text-base leading-8 md:text-lg">
                {{ product.description }}
              </p>
            </div>

            <!-- Minimal price block -->
            <div class="border-t border-b border-white/12 py-5">
              <p class="text-xs uppercase tracking-[0.28em] text-white/40">
                Current offer
              </p>

              <div class="mt-3 flex flex-wrap items-end gap-4">
                <p class="arctic-display text-[2.7rem] leading-none md:text-[3.3rem]">
                  {{ formatCurrency(discountedAmount) }}
                </p>

                <div class="pb-1">
                  <p class="text-base text-white/35 line-through">
                    {{ formatCurrency(product.price) }}
                  </p>
                  <p class="text-sm font-semibold text-white/65">
                    Save {{ Math.round(product.discountPercentage) }}%
                  </p>
                </div>
              </div>
            </div>

            <!-- Size selector -->
            <div class="space-y-3">
              <p class="arctic-label">Size</p>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="size in sizeOptions"
                  :key="size"
                  type="button"
                  class="min-w-[64px] rounded-[0.9rem] border px-5 py-3 text-sm font-semibold transition"
                  :class="
                    selectedSize === size
                      ? 'border-white bg-white text-[#13202b]'
                      : 'border-white/18 bg-white/6 text-white hover:bg-white/10'
                  "
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Color selector -->
            <div class="space-y-3">
              <p class="arctic-label">Color</p>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="color in colorOptions"
                  :key="color.name"
                  type="button"
                  class="inline-flex items-center gap-3 rounded-[0.9rem] border px-4 py-3 text-sm font-semibold transition"
                  :class="
                    selectedColor === color.name
                      ? 'border-white bg-white text-[#13202b]'
                      : 'border-white/18 bg-white/6 text-white hover:bg-white/10'
                  "
                  @click="selectedColor = color.name"
                >
                  <span
                    class="h-4 w-4 rounded-full border border-black/10"
                    :style="{ backgroundColor: color.swatch }"
                  ></span>
                  {{ color.name }}
                </button>
              </div>
            </div>

            <!-- Quick meta -->
            <div class="grid gap-4 sm:grid-cols-3">
              <article class="arctic-stat">
                <p class="arctic-label">Stock</p>
                <p class="mt-3 text-2xl font-extrabold text-white">{{ product.stock }}</p>
              </article>

              <article class="arctic-stat">
                <p class="arctic-label">SKU</p>
                <p class="mt-3 text-lg font-bold text-white">{{ product.sku }}</p>
              </article>

              <article class="arctic-stat">
                <p class="arctic-label">Minimum</p>
                <p class="mt-3 text-2xl font-extrabold text-white">
                  {{ product.minimumOrderQuantity }}
                </p>
              </article>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                class="arctic-button"
                @click="addToCart"
              >
                Add to cart
              </button>

              <button
                type="button"
                class="arctic-button arctic-button--ghost"
                @click="favoritesStore.toggle(product)"
              >
                {{ favoritesStore.isFavorite(product.id) ? 'Remove favorite' : 'Save favorite' }}
              </button>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <article class="arctic-stat">
                <p class="arctic-label">Shipping</p>
                <p class="mt-3 text-sm leading-7 text-white/72">
                  {{ product.shippingInformation }}
                </p>
              </article>

              <article class="arctic-stat">
                <p class="arctic-label">Warranty & returns</p>
                <p class="mt-3 text-sm leading-7 text-white/72">
                  {{ product.warrantyInformation }} · {{ product.returnPolicy }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- Lower detail section -->
      <section class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <article class="arctic-panel p-6">
          <p class="arctic-label">Physical specs</p>

          <div class="mt-5 space-y-4 text-sm leading-7 text-white/72">
            <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <span>Width</span>
              <strong class="text-white">{{ product.dimensions.width }} cm</strong>
            </div>
            <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <span>Height</span>
              <strong class="text-white">{{ product.dimensions.height }} cm</strong>
            </div>
            <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <span>Depth</span>
              <strong class="text-white">{{ product.dimensions.depth }} cm</strong>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span>Weight</span>
              <strong class="text-white">{{ product.weight }} kg</strong>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in product.tags"
              :key="tag"
              class="rounded-full border border-white/15 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/70"
            >
              #{{ tag }}
            </span>
          </div>
        </article>

        <article class="arctic-panel p-6">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="arctic-label">Customer signal</p>
              <h2 class="arctic-title mt-2 text-3xl">Recent reviews</h2>
            </div>
            <span class="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#13202b]">
              {{ product.reviews.length }} reviews
            </span>
          </div>

          <div class="mt-6 space-y-4">
            <article
              v-for="review in product.reviews"
              :key="`${review.reviewerEmail}-${review.date}`"
              class="rounded-[1.4rem] border border-white/15 bg-white/8 p-4"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="font-semibold text-white">{{ review.reviewerName }}</p>
                  <p class="text-xs uppercase tracking-wide text-white/35">
                    {{ formatReviewDate(review.date) }}
                  </p>
                </div>
                <span class="text-sm font-semibold text-white/70">
                  ★ {{ review.rating.toFixed(1) }}
                </span>
              </div>

              <p class="mt-3 text-sm leading-7 text-white/72">
                {{ review.comment }}
              </p>
            </article>
          </div>
        </article>
      </section>

      <section v-if="relatedProducts.length" class="space-y-5">
        <div>
          <p class="arctic-label">Related products</p>
          <h2 class="arctic-title mt-2 text-4xl">
            More from the {{ formattedCategory }} sector
          </h2>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
            v-for="related in relatedProducts"
            :key="related.id"
            :product="related"
          />
        </div>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import EmptyState from '../components/EmptyState.vue';
import ProductCard from '../components/ProductCard.vue';
import { getProductById, getProductsByCategory } from '../services/dummyJson';
import { useCartStore } from '../stores/cart';
import { useFavoritesStore } from '../stores/favorites';
import { useUiStore } from '../stores/ui';
import type { Product } from '../types';
import { discountedPrice, formatCurrency, toTitleCase } from '../utils/format';

const route = useRoute();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const uiStore = useUiStore();

const product = ref<Product | null>(null);
const relatedProducts = ref<Product[]>([]);
const activeImage = ref('');
const loading = ref(true);
const error = ref('');

// UI-only selectors
const sizeOptions = ['S', 'M', 'L', 'XL'];
const colorOptions = [
  { name: 'Ice', swatch: '#dfe8ef' },
  { name: 'Silver', swatch: '#bfc9d3' },
  { name: 'Midnight', swatch: '#33495b' },
];
const selectedSize = ref('M');
const selectedColor = ref('Ice');

const formattedCategory = computed(() =>
  product.value ? toTitleCase(product.value.category) : '',
);

const discountedAmount = computed(() =>
  product.value ? discountedPrice(product.value.price, product.value.discountPercentage) : 0,
);

async function loadProduct(): Promise<void> {
  loading.value = true;
  error.value = '';

  try {
    const id = Number(route.params.id);

    if (!Number.isFinite(id)) {
      throw new Error('Invalid product id.');
    }

    const item = await getProductById(id);
    product.value = item;
    activeImage.value = item.images[0] ?? item.thumbnail;

    const relatedResponse = await getProductsByCategory(item.category);
    relatedProducts.value = relatedResponse.products
      .filter((entry) => entry.id !== item.id)
      .slice(0, 4);

    selectedSize.value = 'M';
    selectedColor.value = 'Ice';
  } catch (loadError) {
    product.value = null;
    relatedProducts.value = [];
    error.value =
      loadError instanceof Error
        ? loadError.message
        : 'Unable to load the requested product.';
  } finally {
    loading.value = false;
  }
}

function addToCart(): void {
  if (!product.value) return;
  cartStore.addProduct(product.value);
  uiStore.openCartDrawer();
}

function formatReviewDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

onMounted(() => {
  void loadProduct();
});

watch(
  () => route.params.id,
  () => {
    void loadProduct();
  },
);
</script>