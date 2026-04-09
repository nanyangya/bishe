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
</style>
