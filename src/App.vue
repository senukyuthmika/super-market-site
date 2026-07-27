<template>
  <div class="relative min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>
      <div class="orb orb-three"></div>
      <div class="noise-overlay"></div>
    </div>

    <NavBar v-if="!isAuthPage" />

    <main :class="isAuthPage ? '' : 'mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8'">
      <RouterView />
    </main>

    <AppFooter v-if="!isAuthPage" />
    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';
import CartDrawer from './components/CartDrawer.vue';
import { useTheme } from './composables/useTheme';
import { useAuthStore } from './stores/auth';

const route = useRoute();
const { applyTheme } = useTheme();
const authStore = useAuthStore();

const isAuthPage = computed(() => Boolean(route.meta.authPage));

onMounted(() => {
  applyTheme();
  void authStore.hydrateProfile();
});
</script>
