<template>
  <div class="memory-page">
    <header class="topbar" aria-label="记忆翻牌状态栏">
      <div class="topbar__left">
        <router-link class="chip chip--ghost" to="/games">返回游戏列表</router-link>
        <div class="chip" aria-label="当前关卡">第 {{ levelIndex + 1 }} / {{ levels.length }} 关</div>
        <div class="chip" aria-label="剩余配对数">剩余 {{ remainingPairs }} 对</div>
      </div>
      <div class="topbar__right">
        <div class="chip" aria-label="用时">用时 {{ elapsedText }}</div>
        <div class="chip" aria-label="步数">步数 {{ moves }}</div>
        <button class="chip chip--ghost" type="button" @click="restartLevel">重开本关</button>
      </div>
    </header>

    <main class="board-shell">
      <section class="board-card" aria-label="记忆翻牌棋盘">
        <div class="board-meta">
          <h2 class="title">记忆翻牌</h2>
          <p class="subtitle">
            点击翻开两张卡牌，配对成功就会锁定。完成全部配对即可过关。
          </p>
        </div>

        <div
          class="grid"
          :style="gridStyle"
          role="grid"
          :aria-rowcount="currentLevel.rows"
          :aria-colcount="currentLevel.cols"
          aria-label="卡牌网格"
        >
          <button
            v-for="(card, idx) in cards"
            :key="card.id"
            class="card"
            type="button"
            role="gridcell"
            :aria-label="cardAriaLabel(card, idx)"
            :aria-pressed="String(card.isFaceUp)"
            :disabled="isCardDisabled(card, idx)"
            @click="onFlip(idx)"
          >
            <span class="card__inner" :data-face-up="String(card.isFaceUp || card.isMatched)">
              <span class="card__face card__face--back" aria-hidden="true">?</span>
              <span class="card__face card__face--front" aria-hidden="true">
                {{ card.value }}
              </span>
            </span>
          </button>
        </div>

        <div class="footer">
          <div class="status" role="status" aria-live="polite">
            <span v-if="phase === 'preview'">记忆阶段：请记住卡牌位置…</span>
            <span v-else-if="phase === 'won'">本关完成！</span>
            <span v-else>开始吧：尽量用更少步数完成配对。</span>
          </div>

          <div class="actions">
            <button class="btn" type="button" @click="restartLevel">重开</button>
            <button
              class="btn btn--primary"
              type="button"
              :disabled="phase !== 'won' || levelIndex >= levels.length - 1"
              @click="nextLevel"
            >
              下一关
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type Phase = "preview" | "playing" | "won";

type LevelConfig = {
  rows: number;
  cols: number;
  previewMs: number;
  flipAnimMs: number;
};

type MemoryCard = {
  id: string;
  pairId: number;
  value: string;
  isFaceUp: boolean;
  isMatched: boolean;
};

const SYMBOLS = [
  "🍎",
  "🍊",
  "🍋",
  "🍉",
  "🍇",
  "🍓",
  "🍒",
  "🥝",
  "🍍",
  "🥥",
  "🥑",
  "🍅",
  "🥕",
  "🌽",
  "🍔",
  "🍟",
  "🍕",
  "🍣",
  "🍰",
  "🍪",
  "🍩",
  "🍿",
  "🍫",
  "🧁",
  "🎲",
  "🧩",
  "🎯",
  "🎮",
  "🚀",
  "⭐",
];

const levels: LevelConfig[] = [
  { rows: 3, cols: 4, previewMs: 900, flipAnimMs: 220 },
  { rows: 4, cols: 4, previewMs: 900, flipAnimMs: 220 },
  { rows: 4, cols: 5, previewMs: 900, flipAnimMs: 220 },
  { rows: 4, cols: 6, previewMs: 900, flipAnimMs: 220 },
  { rows: 5, cols: 6, previewMs: 900, flipAnimMs: 220 },
];

const levelIndex = ref(0);
const cards = ref<MemoryCard[]>([]);
const phase = ref<Phase>("preview");
const moves = ref(0);
const lock = ref(false);
const flipped = ref<number[]>([]);

const timerStartAt = ref<number | null>(null);
const elapsedMs = ref(0);
let timerTick: number | undefined;
let previewTick: number | undefined;

const currentLevel = computed(() => levels[levelIndex.value]);
const totalPairs = computed(() => (currentLevel.value.rows * currentLevel.value.cols) / 2);
const remainingPairs = computed(() => {
  const matchedPairs = new Set(cards.value.filter((c) => c.isMatched).map((c) => c.pairId)).size;
  return Math.max(0, totalPairs.value - matchedPairs);
});

const elapsedText = computed(() => {
  const total = Math.floor(elapsedMs.value / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
});

const gridStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${currentLevel.value.cols}, minmax(0, 1fr))`,
    ["--flip-ms" as any]: `${currentLevel.value.flipAnimMs}ms`,
  };
});

function shuffleInPlace<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck(level: LevelConfig): MemoryCard[] {
  const pairs = (level.rows * level.cols) / 2;
  const symbols = SYMBOLS.slice(0, pairs);
  const deck: MemoryCard[] = [];
  for (let pairId = 0; pairId < pairs; pairId += 1) {
    const value = symbols[pairId] ?? String(pairId + 1);
    deck.push({
      id: `${pairId}-a-${cryptoRandom()}`,
      pairId,
      value,
      isFaceUp: false,
      isMatched: false,
    });
    deck.push({
      id: `${pairId}-b-${cryptoRandom()}`,
      pairId,
      value,
      isFaceUp: false,
      isMatched: false,
    });
  }
  return shuffleInPlace(deck);
}

function cryptoRandom() {
  // 仅用于生成稳定 key 的小随机串；不依赖安全性
  return Math.random().toString(16).slice(2, 10);
}

function clearTimers() {
  if (timerTick != null) window.clearInterval(timerTick);
  if (previewTick != null) window.clearTimeout(previewTick);
  timerTick = undefined;
  previewTick = undefined;
}

function stopTimer() {
  timerStartAt.value = null;
  if (timerTick != null) window.clearInterval(timerTick);
  timerTick = undefined;
}

function startTimer() {
  timerStartAt.value = performance.now();
  if (timerTick != null) window.clearInterval(timerTick);
  timerTick = window.setInterval(() => {
    if (timerStartAt.value == null) return;
    elapsedMs.value = performance.now() - timerStartAt.value;
  }, 200);
}

function startPreview() {
  phase.value = "preview";
  lock.value = true;
  for (const c of cards.value) c.isFaceUp = true;

  if (previewTick != null) window.clearTimeout(previewTick);
  previewTick = window.setTimeout(() => {
    for (const c of cards.value) {
      if (!c.isMatched) c.isFaceUp = false;
    }
    lock.value = false;
    phase.value = "playing";
    startTimer();
  }, currentLevel.value.previewMs);
}

function resetLevelState() {
  clearTimers();
  moves.value = 0;
  flipped.value = [];
  elapsedMs.value = 0;
  timerStartAt.value = null;
  lock.value = false;
  cards.value = buildDeck(currentLevel.value);
  startPreview();
}

function restartLevel() {
  resetLevelState();
}

function nextLevel() {
  if (levelIndex.value >= levels.length - 1) return;
  levelIndex.value += 1;
}

function onFlip(index: number) {
  if (phase.value === "won") return;
  if (lock.value) return;
  const card = cards.value[index];
  if (!card) return;
  if (card.isMatched || card.isFaceUp) return;
  if (flipped.value.length >= 2) return;

  card.isFaceUp = true;
  flipped.value = [...flipped.value, index];

  if (flipped.value.length === 2) {
    moves.value += 1;
    const [aIdx, bIdx] = flipped.value;
    const a = cards.value[aIdx];
    const b = cards.value[bIdx];
    if (!a || !b) return;

    lock.value = true;
    const same = a.pairId === b.pairId;
    const settleDelay = Math.max(160, currentLevel.value.flipAnimMs);

    window.setTimeout(() => {
      if (same) {
        a.isMatched = true;
        b.isMatched = true;
      } else {
        a.isFaceUp = false;
        b.isFaceUp = false;
      }

      flipped.value = [];
      lock.value = false;

      if (cards.value.every((c) => c.isMatched)) {
        phase.value = "won";
        stopTimer();
      }
    }, settleDelay);
  }
}

function isCardDisabled(card: MemoryCard, index: number) {
  if (phase.value === "won") return false;
  if (phase.value === "preview") return true;
  if (lock.value && !card.isFaceUp) return true;
  if (card.isMatched) return true;
  if (flipped.value.length >= 2 && !flipped.value.includes(index)) return true;
  return false;
}

function cardAriaLabel(card: MemoryCard, index: number) {
  const row = Math.floor(index / currentLevel.value.cols) + 1;
  const col = (index % currentLevel.value.cols) + 1;
  const state = card.isMatched ? "已配对" : card.isFaceUp ? `正面：${card.value}` : "背面";
  return `第 ${row} 行第 ${col} 列，${state}`;
}

watch(levelIndex, () => {
  resetLevelState();
});

onMounted(() => {
  resetLevelState();
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<style scoped>
.memory-page {
  flex: 1;
  padding: clamp(1rem, 3.2vw, 2.25rem);
  background: var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
}

.topbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;
}

.topbar__left,
.topbar__right {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-h);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
}

.chip--ghost {
  background: var(--social-bg);
  cursor: pointer;
}

.chip--ghost:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.board-shell {
  display: flex;
  justify-content: center;
  flex: 1;
  min-height: 0;
}

.board-card {
  width: min(980px, 100%);
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--shadow);
  padding: clamp(0.9rem, 2.6vw, 1.4rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
}

.board-meta {
  text-align: left;
}

.title {
  margin: 0;
}

.subtitle {
  margin-top: 0.35rem;
  color: var(--text);
  opacity: 0.95;
  line-height: 1.55;
}

.grid {
  display: grid;
  gap: clamp(0.5rem, 1.2vw, 0.8rem);
  align-content: start;
}

.card {
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 14px;
}

.card:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.card:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.card__inner {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  transform-style: preserve-3d;
  transition: transform var(--flip-ms, 220ms) cubic-bezier(0.2, 0.75, 0.2, 1);
}

.card__inner[data-face-up="true"] {
  transform: rotateY(180deg);
}

.card__face {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  display: grid;
  place-items: center;
  backface-visibility: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.08);
  user-select: none;
}

.card__face--back {
  background: radial-gradient(
      circle at 20% 25%,
      color-mix(in srgb, var(--accent) 28%, transparent) 0%,
      transparent 55%
    ),
    linear-gradient(145deg, var(--surface-strong), var(--surface));
  color: var(--text-h);
  font-weight: 900;
  font-size: clamp(1.1rem, 2.4vw, 1.55rem);
}

.card__face--front {
  transform: rotateY(180deg);
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--accent) 16%, var(--surface-strong)),
    var(--surface-strong)
  );
  color: var(--text-h);
  font-size: clamp(1.35rem, 2.9vw, 1.95rem);
}

.footer {
  margin-top: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.status {
  text-align: left;
  color: var(--text);
}

.actions {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--social-bg);
  color: var(--text-h);
  font-weight: 800;
  cursor: pointer;
}

.btn--primary {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border-color: transparent;
  color: #fff;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>

