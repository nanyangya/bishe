<template>
  <div class="layout">
    <header class="site-header" :data-variant="headerVariant">
      <router-link to="/" class="logo">作品集</router-link>
      <div class="header-actions">
        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="site-nav"
          aria-label="打开或关闭导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-toggle__bars" aria-hidden="true"></span>
        </button>
        <nav id="site-nav" class="site-nav" :data-open="String(menuOpen)" aria-label="主导航">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/projects" class="nav-link">作品</router-link>
          <router-link to="/about" class="nav-link">关于</router-link>
        </nav>
        <button
          type="button"
          class="theme-toggle"
          :aria-pressed="theme.isDark"
          :aria-label="theme.isDark ? '切换为浅色模式' : '切换为深色模式'"
          @click="theme.toggleTheme()"
        >
          <span class="theme-toggle__icon" aria-hidden="true">
            <svg v-if="theme.isDark" class="icon-sun" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93ZM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121Zm2.121-14.435l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121ZM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"
              />
            </svg>
            <svg v-else class="icon-moon" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M10 7a7 7 0 0 0 12 4.9v.05c0 5.429-4.364 9.85-9.75 9.85a9.746 9.746 0 0 1-9.375-7.05A7.99 7.99 0 0 0 10 7Zm-6.5 3.02c.146.767.43 1.48.877 2.1a7.99 7.99 0 0 0 10.99 2.1A5.5 5.5 0 0 1 10 2.5c-.573 0-1.126.088-1.65.252a8 8 0 0 0-5.85 7.27Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </header>
    <main class="site-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "./store/themeStore";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const theme = useThemeStore();
const route = useRoute();
const menuOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  }
);

const headerVariant = computed<"on-hero" | "normal">(() => {
  return route.path === "/" ? "on-hero" : "normal";
});
</script>

<style scoped>
.layout {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  background: var(--surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.site-header[data-variant="on-hero"] {
  color: rgba(255, 255, 255, 0.92);
  background: rgba(10, 10, 16, 0.45);
  border-bottom-color: rgba(255, 255, 255, 0.14);
}

.logo {
  font-family: var(--heading, system-ui, sans-serif);
  font-weight: 600;
  font-size: 1.1rem;
  color: currentColor;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.logo:hover {
  color: var(--accent);
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--social-bg);
  color: currentColor;
  cursor: pointer;
}

.site-header[data-variant="on-hero"] .menu-toggle {
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
}

.menu-toggle:hover {
  border-color: var(--accent-border);
  background: var(--accent-bg);
}

.menu-toggle:active {
  transform: scale(0.98);
}

.menu-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.menu-toggle__bars {
  display: block;
  width: 22px;
  height: 2px;
  background: currentColor;
  position: relative;
  border-radius: 2px;
}

.menu-toggle__bars::before,
.menu-toggle__bars::after {
  content: "";
  position: absolute;
  left: 0;
  width: 22px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
}

.menu-toggle__bars::before {
  top: -7px;
}

.menu-toggle__bars::after {
  top: 7px;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  align-items: center;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--social-bg);
  color: var(--text-h);
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.theme-toggle:hover {
  background: var(--accent-bg);
  border-color: var(--accent-border);
  color: var(--accent);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.theme-toggle__icon {
  display: flex;
  line-height: 0;
}

.nav-link {
  position: relative;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  font-size: 0.95rem;
  color: currentColor;
  text-decoration: none;
  transition:
    color 0.2s,
    background 0.2s,
    transform 0.15s;
}

.nav-link:hover {
  color: currentColor;
  background: var(--social-bg);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: var(--accent);
  background: var(--accent-bg);
  font-weight: 500;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 6px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  opacity: 0.6;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.site-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

@media (max-width: 640px) {
  .menu-toggle {
    display: inline-flex;
  }

  .site-nav {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 58px;
    display: grid;
    gap: 8px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--surface-strong);
    transform: translateY(-6px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .site-header[data-variant="on-hero"] .site-nav {
    background: rgba(10, 10, 16, 0.72);
    border-color: rgba(255, 255, 255, 0.14);
  }

  .site-nav[data-open="true"] {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}
</style>
