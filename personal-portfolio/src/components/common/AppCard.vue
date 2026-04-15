<template>
  <article class="app-card">
    <slot />
  </article>
</template>

<style scoped>
.app-card {
  width: min(320px, 100%);
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid var(--border);
  background: var(--bg);
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.app-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
}
</style>
