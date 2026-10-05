<template>
  <section class="space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p class="text-sm uppercase tracking-[0.3em] text-fuchsia-500 dark:text-cyan-300">Secure checkout</p>
        <h1 class="arctic-title mt-2 text-5xl md:text-6xl">Complete your order</h1>
        <p class="arctic-body mt-3 max-w-2xl text-base leading-7">
          Enter your delivery and payment details to place your AstraMart order.
        </p>
      </div>
      <RouterLink to="/" class="arctic-button arctic-button--ghost">Continue shopping</RouterLink>
    </div>

    <div v-if="isComplete" class="arctic-panel p-8 text-center md:p-12">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">✓</div>
      <p class="mt-6 text-sm uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">Order confirmed</p>
      <h2 class="arctic-title mt-2 text-4xl">Your order is on its way</h2>
      <p class="arctic-body mx-auto mt-3 max-w-lg leading-7">
        Thanks for shopping with AstraMart. This demo order has been placed successfully.
      </p>
      <RouterLink to="/" class="arctic-button mt-7">Back to catalog</RouterLink>
    </div>

    <form v-else-if="cartStore.items.length" class="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]" @submit.prevent="placeOrder">
      <div class="space-y-6">
        <section class="arctic-panel p-6 md:p-8">
          <div class="flex items-center gap-3">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">1</span>
            <h2 class="arctic-title text-3xl">Contact details</h2>
          </div>
          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <label class="checkout-field">
              <span>Email address</span>
              <input v-model="form.email" type="email" autocomplete="email" placeholder="you@example.com" required />
            </label>
            <label class="checkout-field">
              <span>Phone number</span>
              <input v-model="form.phone" type="tel" autocomplete="tel" placeholder="+1 555 000 0000" required />
            </label>
          </div>
        </section>

        <section class="arctic-panel p-6 md:p-8">
          <div class="flex items-center gap-3">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">2</span>
            <h2 class="arctic-title text-3xl">Delivery address</h2>
          </div>
          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <label class="checkout-field sm:col-span-2">
              <span>Full name</span>
              <input v-model="form.name" type="text" autocomplete="name" placeholder="Alex Morgan" required />
            </label>
            <label class="checkout-field sm:col-span-2">
              <span>Street address</span>
              <input v-model="form.address" type="text" autocomplete="street-address" placeholder="123 Market Street" required />
            </label>
            <label class="checkout-field">
              <span>City</span>
              <input v-model="form.city" type="text" autocomplete="address-level2" placeholder="New York" required />
            </label>
            <label class="checkout-field">
              <span>Postal code</span>
              <input v-model="form.postalCode" type="text" autocomplete="postal-code" placeholder="10001" required />
            </label>
            <label class="checkout-field sm:col-span-2">
              <span>Country</span>
              <select v-model="form.country" autocomplete="country-name" required>
                <option value="">Select a country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </label>
          </div>
        </section>

        <section class="arctic-panel p-6 md:p-8">
          <div class="flex items-center gap-3">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">3</span>
            <h2 class="arctic-title text-3xl">Payment method</h2>
          </div>
          <div class="mt-6 space-y-5">
            <div class="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/45 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span class="text-lg">▣</span>
              <span>Cards are encrypted and processed securely.</span>
            </div>
            <label class="checkout-field">
              <span>Name on card</span>
              <input v-model="form.cardName" type="text" autocomplete="cc-name" placeholder="Alex Morgan" required />
            </label>
            <label class="checkout-field">
              <span>Card number</span>
              <input v-model="form.cardNumber" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" minlength="12" required />
            </label>
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="checkout-field">
                <span>Expiry date</span>
                <input v-model="form.expiry" type="text" inputmode="numeric" autocomplete="cc-exp" placeholder="MM / YY" required />
              </label>
              <label class="checkout-field">
                <span>Security code</span>
                <input v-model="form.cvv" type="password" inputmode="numeric" autocomplete="cc-csc" placeholder="CVV" minlength="3" maxlength="4" required />
              </label>
            </div>
          </div>
        </section>
      </div>

      <aside class="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 dark:bg-white dark:text-slate-950 md:p-8 lg:sticky lg:top-6">
        <p class="text-sm uppercase tracking-[0.3em] text-cyan-300 dark:text-fuchsia-600">Order summary</p>
        <div class="mt-6 space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3">
            <img :src="item.thumbnail" :alt="item.title" class="h-14 w-14 rounded-xl object-cover" />
            <div class="min-w-0 flex-1">
              <p class="truncate font-semibold">{{ item.title }}</p>
              <p class="mt-1 text-sm text-white/55 dark:text-slate-500">Qty {{ item.quantity }}</p>
            </div>
            <span class="text-sm font-semibold">{{ formatCurrency(discountedPrice(item.price, item.discountPercentage) * item.quantity) }}</span>
          </div>
        </div>
        <div class="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm dark:border-slate-200">
          <div class="flex justify-between text-white/65 dark:text-slate-500"><span>Subtotal</span><span>{{ formatCurrency(cartStore.subtotal) }}</span></div>
          <div class="flex justify-between text-emerald-300 dark:text-emerald-600"><span>Discount</span><span>-{{ formatCurrency(cartStore.totalSavings) }}</span></div>
          <div class="flex justify-between text-white/65 dark:text-slate-500"><span>Shipping</span><span>Free</span></div>
          <div class="flex justify-between border-t border-white/10 pt-4 text-xl font-bold dark:border-slate-200"><span>Total</span><span>{{ formatCurrency(cartStore.finalTotal) }}</span></div>
        </div>
        <button type="submit" class="mt-7 w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-5 py-4 font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5">
          Proceed with payment
        </button>
        <p class="mt-4 text-center text-xs text-white/45 dark:text-slate-500">Demo checkout: no real payment will be charged.</p>
      </aside>
    </form>

    <EmptyState
      v-else
      title="Your cart is empty"
      description="Add a product before proceeding to checkout."
      icon="🛒"
    />
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import EmptyState from '../components/EmptyState.vue';
import { useCartStore } from '../stores/cart';
import { discountedPrice, formatCurrency } from '../utils/format';

const cartStore = useCartStore();
const isComplete = ref(false);
const form = reactive({
  email: '',
  phone: '',
  name: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});

function placeOrder(): void {
  isComplete.value = true;
  cartStore.clear();
}
</script>
