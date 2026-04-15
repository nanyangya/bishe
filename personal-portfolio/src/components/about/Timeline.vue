<template>
  <ol class="timeline">
    <li v-for="item in items" :key="`${item.year}-${item.title}`" class="item">
      <p class="year">{{ item.year }}</p>
      <h3>{{ item.title }}</h3>
      <p v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</p>
      <p class="desc">{{ item.description }}</p>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { TimelineItem } from "../../types/profile";

defineProps<{
  items: TimelineItem[];
}>();
</script>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.9rem;
}

.item {
  text-align: left;
  padding: 0.9rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.year {
  margin: 0;
  color: var(--accent);
  font-weight: 700;
}

h3 {
  margin: 0.3rem 0 0.2rem;
  color: var(--text-h);
}

.subtitle {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
}

.desc {
  margin: 0.35rem 0 0;
  line-height: 1.5;
}
</style>

