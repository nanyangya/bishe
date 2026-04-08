<template>
  <div class="home">
    <h1 class="animate__animated animate__fadeInDown">欢迎来到我的作品集</h1>
    <p class="animate__animated animate__fadeInUp">
      展示我的前端项目与创意作品
    </p>

    <!-- 轮播：aria 地标，配图可点击下载 -->
    <div
      class="home-swiper-wrap"
      role="region"
      aria-label="精选作品轮播，幻灯片内图片可点击下载"
    >
      <swiper
        class="home-swiper animate__animated animate__fadeIn"
        :modules="modules"
        :slides-per-view="1"
        :loop="topProjects.length > 1"
        :autoplay="{ delay: 2800, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :auto-height="true"
        :prevent-clicks="false"
        :prevent-clicks-propagation="false"
        navigation
      >
        <swiper-slide v-for="project in topProjects" :key="project.id">
          <button
            type="button"
            class="slide-image-link"
            :aria-label="`下载 ${project.title} 的配图`"
            :aria-describedby="`slide-title-${project.id}`"
            @click="downloadProjectImage(project)"
          >
            <img :src="project.image" alt="" decoding="async" />
          </button>
          <h3 :id="`slide-title-${project.id}`">{{ project.title }}</h3>
        </swiper-slide>
      </swiper>
    </div>

    <router-link to="/projects" class="btn animate__animated animate__bounceIn">
      查看全部作品
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { projects, type Project } from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default defineComponent({
  name: "Home",
  components: { Swiper, SwiperSlide },
  setup() {
    const topProjects = computed(() => projects.slice(0, 3));
    const modules = [Autoplay, Pagination, Navigation];

    function toAbsoluteUrl(src: string) {
      if (/^https?:\/\//i.test(src)) return src;
      return new URL(src, window.location.origin).href;
    }

    function suggestedDownloadName(project: Project) {
      const tail = project.image.split(/[/\\]/).pop() || "";
      if (tail && /\.[a-z0-9]{2,4}$/i.test(tail)) return tail;
      const safe =
        project.title.replace(/[/\\?%*:|"<>]/g, "").slice(0, 80) ||
        `project-${project.id}`;
      return `${safe}.jpg`;
    }

    /** 用 blob 触发下载，避免整页跳到图片导致 SPA 像「无法路由」 */
    async function downloadProjectImage(project: Project) {
      const url = toAbsoluteUrl(project.image);
      const name = suggestedDownloadName(project);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = name;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
      } catch {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }

    return { topProjects, modules, downloadProjectImage };
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem);
  background:
    radial-gradient(
      ellipse 120% 80% at 20% 0%,
      rgba(255, 255, 255, 0.2),
      transparent 50%
    ),
    radial-gradient(
      ellipse 100% 60% at 100% 100%,
      rgba(0, 0, 0, 0.12),
      transparent 45%
    ),
    linear-gradient(145deg, #ff6b4a 0%, #ff8f6b 40%, #f59e6b 100%);
  color: #fff;
  flex: 1;
  min-height: calc(100svh - 3.5rem);
}

.home h1 {
  color: #fff;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.15);
  max-width: 18ch;
}

.home > p {
  margin-top: 0.5rem;
  max-width: 32ch;
  font-size: 1.05rem;
  line-height: 1.55;
  opacity: 0.95;
}

.home-swiper-wrap {
  width: min(640px, 100%);
  margin: 1.75rem auto 0;
}

.home-swiper {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2.5rem;
  --swiper-theme-color: #fff;
  --swiper-navigation-size: 28px;
}

.slide-image-link {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
  outline: none;
}

.slide-image-link:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 4px;
}

.slide-image-link:hover img {
  filter: brightness(1.05);
}

.home-swiper :deep(.swiper-button-prev),
.home-swiper :deep(.swiper-button-next) {
  color: #fff;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
}

.home-swiper :deep(.swiper-pagination-bullet) {
  background: #fff;
  opacity: 0.45;
}

.home-swiper :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

.home-swiper img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.home-swiper h3 {
  margin: 0.85rem 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.btn {
  margin-top: 1.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
  backdrop-filter: blur(8px);
}

.btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.28);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}
</style>
