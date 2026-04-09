<template>
  <span class="app-tag">
    <slot />
  </span>
</template>

<style scoped>
.app-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 600;
}

:global(html[data-theme="dark"]) .app-tag {
  color: #ffffff;
  background: rgba(192, 132, 252, 0.22);
  border-color: rgba(192, 132, 252, 0.75);
}
</style>
