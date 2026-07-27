import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isCartDrawerOpen: false,
  }),
  actions: {
    openCartDrawer(): void {
      this.isCartDrawerOpen = true;
    },
    closeCartDrawer(): void {
      this.isCartDrawerOpen = false;
    },
    toggleCartDrawer(): void {
      this.isCartDrawerOpen = !this.isCartDrawerOpen;
    },
  },
});
