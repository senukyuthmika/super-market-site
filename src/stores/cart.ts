import { defineStore } from 'pinia';
import type { CartProduct, Product } from '../types';
import { discountedPrice } from '../utils/format';
import { readStorage, writeStorage } from '../utils/storage';

const CART_KEY = 'astramart.cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: readStorage<CartProduct[]>(CART_KEY, []),
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalSavings: (state) =>
      state.items.reduce(
        (sum, item) => sum + (item.price - discountedPrice(item.price, item.discountPercentage)) * item.quantity,
        0,
      ),
    finalTotal(): number {
      return Number((this.subtotal - this.totalSavings).toFixed(2));
    },
  },
  actions: {
    persist(): void {
      writeStorage(CART_KEY, this.items);
    },
    addProduct(product: Product, quantity = 1): void {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.unshift({
          id: product.id,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail,
          brand: product.brand,
          quantity,
        });
      }
      this.persist();
    },
    increment(productId: number): void {
      const item = this.items.find((entry) => entry.id === productId);
      if (!item) {
        return;
      }
      item.quantity += 1;
      this.persist();
    },
    decrement(productId: number): void {
      const item = this.items.find((entry) => entry.id === productId);
      if (!item) {
        return;
      }
      if (item.quantity <= 1) {
        this.remove(productId);
        return;
      }
      item.quantity -= 1;
      this.persist();
    },
    remove(productId: number): void {
      this.items = this.items.filter((item) => item.id !== productId);
      this.persist();
    },
    clear(): void {
      this.items = [];
      this.persist();
    },
  },
});
