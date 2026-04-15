<template>
  <div class="projects">
    <SectionHeader
      title="项目区域"
      subtitle="按类型快速筛选你的学习项目、实战项目和工具类项目。"
    />
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
      <AppCard v-for="project in filteredProjects" :key="project.id" class="project-card">
        <img :src="project.image" :alt="project.title" />
        <p class="meta">{{ project.category }} · {{ project.date }}</p>
        <h3>{{ project.title }}</h3>
        <p class="summary">{{ project.summary }}</p>
        <p class="desc" :title="project.description">{{ project.description }}</p>
        <div class="tag-list">
          <AppTag v-for="tag in project.tags" :key="tag">{{ tag }}</AppTag>
        </div>
        <div class="actions">
          <router-link class="btn-link" :to="`/projects/${project.id}`">查看详情</router-link>
          <a
            v-if="project.links.demo"
            class="btn-link ghost"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            在线预览
          </a>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { projects } from "../data/projects";
import AppCard from "../components/common/AppCard.vue";
import AppTag from "../components/common/AppTag.vue";
import SectionHeader from "../components/common/SectionHeader.vue";

export default defineComponent({
  name: "Projects",
  components: { AppCard, AppTag, SectionHeader },
  setup() {
    const selectedCategory = ref("全部");

    const categories = computed(() => [
      "全部",
      ...new Set(projects.map((p) => p.category)),
    ]);

    const filteredProjects = computed(() => {
      if (selectedCategory.value === "全部") return projects;
      return projects.filter((p) => p.category === selectedCategory.value);
    });

    return { selectedCategory, categories, filteredProjects };
  },
});
</script>

<style scoped>
.projects {
  padding: clamp(1.5rem, 4vw, 2.75rem);
  flex: 1;
  background: var(--bg);
  color: var(--text);
}

.filters {
  margin: 0 0 1.75rem;
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
  justify-content: center;
  gap: 1.75rem;
}

.project-card {
  text-align: left;
}

.project-card h3 {
  margin: 0.5rem 0 0.35rem;
  font-size: 1.1rem;
  color: var(--text-h);
}

.meta {
  margin: 0.65rem 0 0;
  font-size: 0.8rem;
  color: var(--text);
}

.summary {
  margin: 0;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.86rem;
}

.desc {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.actions {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.btn-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition:
    transform 0.15s ease,
    filter 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-link:hover {
  filter: brightness(1.05);
  box-shadow: 0 10px 24px rgba(37, 117, 252, 0.25);
  transform: translateY(-1px);
}

.btn-link:active {
  transform: translateY(0) scale(0.98);
}

.btn-link.ghost {
  background: var(--social-bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}

:global(html[data-theme="dark"]) .btn-link.ghost {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.24);
}

.project-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 12px;
}
</style>