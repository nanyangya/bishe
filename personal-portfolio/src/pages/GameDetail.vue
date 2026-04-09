<template>
  <div class="game-detail">
    <div v-if="game" class="card">
      <h2>{{ game.title }}</h2>
      <img :src="game.image" :alt="game.title" loading="lazy" />
      <p class="summary">{{ game.summary }}</p>
      <p class="desc">{{ game.description }}</p>
      <div class="tags">
        <AppTag>{{ game.genre }}</AppTag>
        <AppTag>{{ game.difficulty }}</AppTag>
        <AppTag>{{ game.controls }}</AppTag>
      </div>
      <div class="actions">
        <a
          v-if="game.playUrl"
          class="btn-link"
          :href="game.playUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          开始试玩
        </a>
        <a
          v-if="game.repoUrl"
          class="btn-link ghost"
          :href="game.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          查看源码
        </a>
      </div>
    </div>
    <div v-else class="card not-found">
      <h2>未找到该游戏</h2>
      <router-link to="/games" class="btn-link">返回游戏列表</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppTag from "../components/common/AppTag.vue";
import { games } from "../data/games";

const route = useRoute();
const game = computed(() => {
  const id = Number(route.params.id);
  if (Number.isNaN(id)) return undefined;
  return games.find((g) => g.id === id);
});
</script>

<style scoped>
.game-detail {
  flex: 1;
  padding: clamp(1.5rem, 4vw, 2.75rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: min(820px, 100%);
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 1rem;
}

img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  aspect-ratio: 16 / 10;
}

.summary {
  color: var(--accent);
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.actions {
  margin-top: 0.75rem;
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
}

.btn-link.ghost {
  background: var(--social-bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}
</style>

