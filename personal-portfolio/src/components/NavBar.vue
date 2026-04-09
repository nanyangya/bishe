<template>
  <header class="nav-shell" :data-variant="variant">
    <div class="nav-inner">
      <RouterLink class="brand" to="/" aria-label="返回首页">作品集</RouterLink>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="primary-nav"
        aria-label="打开或关闭导航菜单"
        @click="open = !open"
      >
        <span class="nav-toggle-bars" aria-hidden="true"></span>
      </button>

      <nav id="primary-nav" class="nav" :data-open="String(open)">
        <RouterLink class="nav-link" to="/">首页</RouterLink>
        <RouterLink class="nav-link" to="/projects">作品</RouterLink>
        <RouterLink class="nav-link" to="/about">关于</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";

const route = useRoute();
const open = ref(false);

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  }
);

const variant = computed<"dark" | "light">(() => {
  return route.path === "/" ? "dark" : "light";
});
</script>

<style scoped>
.nav-shell {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.nav-shell[data-variant="dark"] {
  background: rgba(10, 10, 16, 0.55);
}

.nav-shell[data-variant="light"] {
  background: rgba(255, 255, 255, 0.75);
  border-bottom-color: rgba(10, 10, 16, 0.08);
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  font-weight: 800;
  letter-spacing: 0.4px;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
}

.nav {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-link {
  position: relative;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 0.2px;
  transition: transform 0.15s ease, background-color 0.2s ease;
  color: inherit;
  opacity: 0.95;
}

.nav-link:hover {
  transform: translateY(-1px);
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 6px;
  height: 2px;
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
  background: currentColor;
  opacity: 0.8;
}

.nav-link:hover::after,
.router-link-active.nav-link::after {
  transform: scaleX(1);
}

.nav-toggle {
  display: none;
  border: 0;
  background: transparent;
  padding: 8px;
  border-radius: 10px;
  color: inherit;
}

.nav-toggle:active {
  transform: scale(0.98);
}

.nav-toggle-bars {
  display: block;
  width: 22px;
  height: 2px;
  background: currentColor;
  position: relative;
  border-radius: 2px;
}

.nav-toggle-bars::before,
.nav-toggle-bars::after {
  content: "";
  position: absolute;
  left: 0;
  width: 22px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
}

.nav-toggle-bars::before {
  top: -7px;
}

.nav-toggle-bars::after {
  top: 7px;
}

@media (max-width: 640px) {
  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nav {
    position: absolute;
    top: 56px;
    right: 12px;
    left: 12px;
    display: grid;
    gap: 8px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(10, 10, 16, 0.7);
    transform: translateY(-6px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .nav-shell[data-variant="light"] .nav {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(10, 10, 16, 0.08);
  }

  .nav[data-open="true"] {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}
</style>
