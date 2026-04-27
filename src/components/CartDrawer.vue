<template>
  <div v-if="uiStore.isCartDrawerOpen" class="fixed inset-0 z-50">
    <button type="button" class="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" @click="uiStore.closeCartDrawer"></button>
    <aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/15 bg-white/85 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl dark:bg-slate-950/85">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-fuchsia-500 dark:text-cyan-300">Persistent cart</p>
          <h3 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Mission manifest</h3>
        </div>
        <button type="button" class="rounded-2xl border border-white/20 px-3 py-2 text-sm text-slate-600 transition hover:bg-white/10 dark:text-slate-300" @click="uiStore.closeCartDrawer">Close</button>
      </div>

      <div v-if="cartStore.items.length" class="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
        <article v-for="item in cartStore.items" :key="item.id" class="rounded-[1.5rem] border border-white/20 bg-white/55 p-4 shadow-lg shadow-slate-950/5 dark:bg-slate-900/45">
          <div class="flex gap-4">
            <img :src="item.thumbnail" :alt="item.title" class="h-20 w-20 rounded-2xl object-cover" />
            <div class="flex-1">
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.brand ?? 'Astra Select' }}</p>
              <h4 class="line-clamp-2 text-base font-semibold text-slate-950 dark:text-white">{{ item.title }}</h4>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ formatCurrency(discountedPrice(item.price, item.discountPercentage)) }} each</p>
              <div class="mt-3 flex items-center justify-between">
                <div class="inline-flex items-center rounded-2xl border border-white/20 bg-white/50 dark:bg-slate-950/45">
                  <button type="button" class="px-3 py-2 text-lg" @click="cartStore.decrement(item.id)">-</button>
                  <span class="min-w-10 text-center text-sm font-semibold">{{ item.quantity }}</span>
                  <button type="button" class="px-3 py-2 text-lg" @click="cartStore.increment(item.id)">+</button>
                </div>
                <button type="button" class="text-sm font-medium text-rose-500" @click="cartStore.remove(item.id)">Remove</button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <EmptyState
        v-else
        class="mt-6"
        title="No cargo loaded yet"
        description="Add products from the catalog and they will stay here even after a refresh."
        icon="🛒"
      />

      <div class="mt-6 rounded-[1.75rem] border border-white/20 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 dark:bg-white dark:text-slate-950">
        <div class="flex items-center justify-between text-sm text-white/70 dark:text-slate-500">
          <span>Subtotal</span>
          <span>{{ formatCurrency(cartStore.subtotal) }}</span>
        </div>
        <div class="mt-3 flex items-center justify-between text-sm text-emerald-300 dark:text-emerald-600">
          <span>Neon discount savings</span>
          <span>-{{ formatCurrency(cartStore.totalSavings) }}</span>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-lg font-bold dark:border-slate-200">
          <span>Total</span>
          <span>{{ formatCurrency(cartStore.finalTotal) }}</span>
        </div>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <button type="button" class="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 dark:border-slate-300 dark:hover:bg-slate-100" @click="cartStore.clear">Clear cart</button>
          <button type="button" class="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20">Simulate checkout</button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import EmptyState from './EmptyState.vue';
import { useCartStore } from '../stores/cart';
import { useUiStore } from '../stores/ui';
import { discountedPrice, formatCurrency } from '../utils/format';

const cartStore = useCartStore();
const uiStore = useUiStore();
</script>
