import { computed, ref } from 'vue';

const THEME_KEY = 'astramart.theme';
const theme = ref<'light' | 'dark'>('dark');

function resolveInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(themeValue = theme.value): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', themeValue === 'dark');
}

theme.value = resolveInitialTheme();
applyTheme();

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark');

  function setTheme(nextTheme: 'light' | 'dark'): void {
    theme.value = nextTheme;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, nextTheme);
    }
    applyTheme(nextTheme);
  }

  function toggleTheme(): void {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  }

  return {
    theme,
    isDark,
    applyTheme,
    setTheme,
    toggleTheme,
  };
}
