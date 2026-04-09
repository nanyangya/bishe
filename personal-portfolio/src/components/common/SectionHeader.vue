<template>
  <header class="section-header">
    <h2>{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 1.2rem;
}

.section-header h2 {
  margin: 0;
}

.section-header p {
  margin: 0.5rem auto 0;
  max-width: 44ch;
  color: var(--text);
}
</style>
