<template>
  <div class="relative min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>
      <div class="orb orb-three"></div>
      <div class="noise-overlay"></div>
    </div>

    <NavBar />

    <main class="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>

    <AppFooter />
    <CartDrawer />
    <AuthModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';
import CartDrawer from './components/CartDrawer.vue';
import AuthModal from './components/AuthModal.vue';
import { useTheme } from './composables/useTheme';
import { useAuthStore } from './stores/auth';

const { applyTheme } = useTheme();
const authStore = useAuthStore();

onMounted(() => {
  applyTheme();
  void authStore.hydrateProfile();
});
</script>
