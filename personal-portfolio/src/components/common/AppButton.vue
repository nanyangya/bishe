<template>
  <component
    :is="tag"
    class="app-btn"
    :class="[variant, { block }]"
    v-bind="attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    tag?: "button" | "a";
    variant?: "primary" | "secondary";
    block?: boolean;
  }>(),
  {
    tag: "button",
    variant: "primary",
    block: false,
  }
);

const attrs = useAttrs();
const tag = computed(() => props.tag);
const variant = computed(() => props.variant);
const block = computed(() => props.block);
</script>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border: none;
  border-radius: 999px;
  padding: 0.58rem 1rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.15s ease, filter 0.2s ease, box-shadow 0.2s ease;
}

.app-btn.primary {
  color: #fff;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
}

.app-btn.secondary {
  color: var(--text-h);
  background: var(--social-bg);
  border: 1px solid var(--border);
}

.app-btn.block {
  width: 100%;
}

.app-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.app-btn:active {
  transform: translateY(0) scale(0.98);
}

.app-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>

