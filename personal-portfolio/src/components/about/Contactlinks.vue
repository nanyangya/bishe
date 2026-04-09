<template>
  <ul class="contact-list">
    <li v-for="item in items" :key="item.label">
      <a :href="item.href" target="_blank" rel="noopener noreferrer">
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ContactItem } from "../../types/profile";

defineProps<{
  items: ContactItem[];
}>();
</script>

<style scoped>
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  text-decoration: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.7rem 0.85rem;
  background: var(--surface);
  color: var(--text-h);
}

a:hover {
  border-color: var(--accent-border);
}

.label {
  font-weight: 700;
}

.value {
  color: var(--text);
}
</style>

