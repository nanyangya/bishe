<template>
  <div class="about">
    <h2>关于我</h2>
    <p>我是前端开发爱好者，喜欢炫彩动画和创意项目。</p>
    <div class="skills">
      <span>Vue3</span>
      <span>TypeScript</span>
      <span>HTML/CSS</span>
      <span>JavaScript</span>
      <span>Animate.css</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
});
</script>

<style scoped>
.about {
  padding: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  flex: 1;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 255, 255, 0.25), transparent),
    linear-gradient(145deg, #2dd4bf 0%, #0d9488 45%, #155e75 100%);
  color: #f0fdfa;
}

.about h2 {
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.12);
}

.about p {
  max-width: 36ch;
  margin: 0.75rem auto 0;
  line-height: 1.65;
  opacity: 0.96;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.75rem;
}

.skills span {
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(6px);
}
</style>
