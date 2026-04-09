<template>
  <div class="games">
    <SectionHeader
      title="游戏区域"
      subtitle="按类型与难度筛选，后续你只需继续添加游戏数据即可自动展示。"
    />

    <div class="filters">
      <div class="group">
        <button
          v-for="genre in genres"
          :key="genre"
          type="button"
          :class="{ active: selectedGenre === genre }"
          @click="selectedGenre = genre"
        >
          {{ genre }}
        </button>
      </div>
      <div class="group">
        <button
          v-for="difficulty in difficulties"
          :key="difficulty"
          type="button"
          :class="{ active: selectedDifficulty === difficulty }"
          @click="selectedDifficulty = difficulty"
        >
          {{ difficulty }}
        </button>
      </div>
    </div>

    <div class="game-list">
      <AppCard v-for="game in filteredGames" :key="game.id" class="game-card">
        <img :src="game.image" :alt="game.title" />
        <h3>{{ game.title }}</h3>
        <p class="summary">{{ game.summary }}</p>
        <p class="desc" :title="game.description">{{ game.description }}</p>
        <div class="meta-row">
          <AppTag>{{ game.genre }}</AppTag>
          <AppTag>{{ game.difficulty }}</AppTag>
          <AppTag>{{ game.controls }}</AppTag>
        </div>
        <div class="actions">
          <router-link class="btn-link" :to="`/games/${game.id}`">查看详情</router-link>
          <a
            v-if="game.playUrl"
            class="btn-link ghost"
            :href="game.playUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            在线试玩
          </a>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppCard from "../components/common/AppCard.vue";
import AppTag from "../components/common/AppTag.vue";
import SectionHeader from "../components/common/SectionHeader.vue";
import { games } from "../data/games";

const selectedGenre = ref("全部类型");
const selectedDifficulty = ref("全部难度");

const genres = computed(() => ["全部类型", ...new Set(games.map((g) => g.genre))]);
const difficulties = computed(() => ["全部难度", ...new Set(games.map((g) => g.difficulty))]);

const filteredGames = computed(() =>
  games.filter((g) => {
    const matchGenre = selectedGenre.value === "全部类型" || g.genre === selectedGenre.value;
    const matchDifficulty =
      selectedDifficulty.value === "全部难度" || g.difficulty === selectedDifficulty.value;
    return matchGenre && matchDifficulty;
  })
);
</script>

<style scoped>
.games {
  padding: clamp(1.5rem, 4vw, 2.75rem);
  background: var(--bg);
  color: var(--text);
  flex: 1;
}

.filters {
  display: grid;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.group button {
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--social-bg);
  color: var(--text-h);
  cursor: pointer;
}

.group button.active {
  border-color: var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.75rem;
}

.game-card h3 {
  margin: 0.65rem 0 0.3rem;
}

.summary {
  margin: 0;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.86rem;
}

.desc {
  margin: 0.35rem 0 0.75rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.7rem;
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
}

.btn-link.ghost {
  background: var(--social-bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}

img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 12px;
}
</style>

