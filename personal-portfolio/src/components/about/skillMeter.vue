<template>
  <ul class="skill-list">
    <li v-for="skill in items" :key="skill.name">
      <div class="row">
        <span>{{ skill.name }}</span>
        <span>{{ skill.level }}%</span>
      </div>
      <div class="bar">
        <div class="bar-inner" :style="{ width: `${skill.level}%` }"></div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SkillItem } from "../../types/profile";

defineProps<{
  items: SkillItem[];
}>();
</script>

<style scoped>
.skill-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.row {
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
  margin-bottom: 0.3rem;
}

.bar {
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, var(--bg));
  overflow: hidden;
}

.bar-inner {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
}
</style>

