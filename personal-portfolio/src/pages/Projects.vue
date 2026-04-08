<template>
  <div class="projects">
    <h2>我的作品</h2>

    <!-- 分类筛选 -->
    <div class="filters">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="{ active: selectedCategory === cat }"
      >
        {{ cat }}
      </button>
    </div>

    <div class="project-list">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card animate__animated animate__fadeInUp"
      >
        <img :src="project.image" :alt="project.title" />
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <router-link :to="`/projects/${project.id}`">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { projects } from "../data/projects";

export default defineComponent({
  name: "Projects",
  setup() {
    const selectedCategory = ref("All");

    // 动态生成分类
    const categories = computed(() => [
      "All",
      ...new Set(projects.map((p) => p.category)),
    ]);

    const filteredProjects = computed(() => {
      if (selectedCategory.value === "All") return projects;
      return projects.filter((p) => p.category === selectedCategory.value);
    });

    return { selectedCategory, categories, filteredProjects };
  },
});
</script>

<style scoped>
.projects {
  padding: clamp(1.5rem, 4vw, 2.75rem);
  text-align: center;
  flex: 1;
  background: var(--bg);
  color: var(--text);
}

.projects h2 {
  margin-top: 0;
}

.filters {
  margin: 1.25rem 0 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filters button {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  cursor: pointer;
  background: var(--social-bg);
  color: var(--text-h);
  font-size: 0.9rem;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.filters button.active {
  background: var(--accent-bg);
  border-color: var(--accent-border);
  color: var(--accent);
  font-weight: 600;
}

.filters button:hover {
  transform: translateY(-1px);
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
}

.project-card {
  width: min(280px, 100%);
  background: var(--bg);
  border-radius: 16px;
  padding: 1.1rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  text-align: left;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
}

.project-card h3 {
  margin: 0.65rem 0 0.35rem;
  font-size: 1.1rem;
  color: var(--text-h);
}

.project-card p {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.project-card a {
  display: inline-block;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--accent);
  text-decoration: none;
}

.project-card a:hover {
  text-decoration: underline;
}

.project-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 12px;
}
</style>