import { defineStore } from 'pinia';
import type { FavoriteProduct, Product } from '../types';
import { readStorage, writeStorage } from '../utils/storage';

const FAVORITES_KEY = 'astramart.favorites';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: readStorage<FavoriteProduct[]>(FAVORITES_KEY, []),
  }),
  getters: {
    totalFavorites: (state) => state.items.length,
  },
  actions: {
    persist(): void {
      writeStorage(FAVORITES_KEY, this.items);
    },
    isFavorite(productId: number): boolean {
      return this.items.some((item) => item.id === productId);
    },
    remove(productId: number): void {
      this.items = this.items.filter((item) => item.id !== productId);
      this.persist();
    },
    toggle(product: Product): void {
      if (this.isFavorite(product.id)) {
        this.remove(product.id);
      } else {
        this.items.unshift({
          id: product.id,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          category: product.category,
          brand: product.brand,
          thumbnail: product.thumbnail,
        });
        this.persist();
      }
    },
  },
});
