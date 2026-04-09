<template>
  <div v-if="project" class="project-detail">
    <h2>{{ project.title }}</h2>
    <img :src="project.image" :alt="project.title" loading="lazy" />
    <p class="desc">{{ project.description }}</p>
    <p class="meta">分类：{{ project.category }}</p>
    <p class="meta tags">
      标签：
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </p>
    <div class="actions">
      <button type="button" @click="toggleFavorite" :class="{ favorite: isFavorite }">
        {{ isFavorite ? "已收藏" : "收藏" }}
      </button>
      <a :href="project.link" target="_blank" rel="noopener noreferrer" class="link-out">
        查看在线项目
      </a>
    </div>
  </div>
  <div v-else class="project-detail not-found">
    <h2>未找到作品</h2>
    <p>该链接对应的作品不存在或已移除。</p>
    <router-link to="/projects" class="back-link">返回作品列表</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../data/projects";
import { useMainStore } from "../store/mainStore";

export default defineComponent({
  name: "ProjectDetail",
  setup() {
    const route = useRoute();
    const store = useMainStore();
    const project = computed(() => {
      const id = Number(route.params.id);
      if (Number.isNaN(id)) return undefined;
      return projects.find((p) => p.id === id);
    });

    const isFavorite = computed(() => {
      if (!project.value) return false;
      return store.favorites.includes(project.value.id);
    });

    const toggleFavorite = () => {
      if (project.value) store.toggleFavorite(project.value.id);
    };

    return { project, isFavorite, toggleFavorite };
  },
});
</script>

<style scoped>
.project-detail {
  padding: clamp(2rem, 5vw, 3rem);
  text-align: center;
  background: linear-gradient(160deg, var(--accent-bg), color-mix(in srgb, var(--bg) 92%, var(--accent) 8%));
  border-radius: 0;
  flex: 1;
  color: var(--text);
  min-height: calc(100svh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-detail > * {
  margin-left: auto;
  margin-right: auto;
}

.project-detail h2 {
  margin-top: 0;
  color: var(--text-h);
}

.project-detail img {
  width: min(520px, 100%);
  border-radius: 16px;
  margin: 1rem auto 0;
  display: block;
  box-shadow: var(--shadow);
}

.desc {
  margin-top: 1.25rem;
  max-width: 42ch;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.meta {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: var(--text);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: var(--social-bg);
  color: var(--text-h);
  font-size: 0.85rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.75rem;
}

.actions button {
  margin-top: 0;
  padding: 0.55rem 1.35rem;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

.actions button:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.actions button:active {
  transform: translateY(0) scale(0.98);
}

.actions button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.actions button.favorite {
  background: color-mix(in srgb, var(--accent) 65%, var(--text-h));
}

.link-out,
.back-link {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 1.35rem;
  border-radius: 999px;
  background: var(--social-bg);
  color: var(--text-h);
  text-decoration: none;
  font-weight: 600;
  border: 1px solid var(--border);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.link-out:hover,
.back-link:hover {
  box-shadow: var(--shadow);
}

.link-out:active,
.back-link:active {
  transform: scale(0.98);
}

.link-out:focus-visible,
.back-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

:global(html[data-theme="dark"]) .project-detail {
  background: linear-gradient(
    160deg,
    rgba(124, 58, 237, 0.18),
    color-mix(in srgb, var(--bg) 86%, #000 14%)
  );
}

.not-found h2 {
  margin-bottom: 0.5rem;
}

.not-found p {
  margin-bottom: 1.25rem;
  opacity: 0.9;
}
</style>
