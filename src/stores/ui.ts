import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isAuthModalOpen: false,
    isCartDrawerOpen: false,
  }),
  actions: {
    openAuthModal(): void {
      this.isAuthModalOpen = true;
    },
    closeAuthModal(): void {
      this.isAuthModalOpen = false;
    },
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
