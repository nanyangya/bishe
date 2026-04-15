# Personal Portfolio

基于 Vue 3 + TypeScript + Vite 的个人作品集网站，包含首页展示、项目列表、项目详情和关于页面。

## 技术栈

- Vue 3
- Vue Router
- Pinia
- Swiper
- animate.css
- TypeScript
- Vite

## 目录结构

````text
personal-portfolio
├─ public
├src
├─ assets/
│  ├─ images/
│  │  ├─ projects/
│  │  ├─ games/
│  │  └─ profile/
│  └─ icons/
├─ components/
│  ├─ common/
│  │  ├─ AppButton.vue
│  │  ├─ AppCard.vue
│  │  ├─ AppTag.vue
│  │  ├─ SectionHeader.vue
│  │  ├─ EmptyState.vue
│  │  └─ LoadingSkeleton.vue
│  ├─ layout/
│  │  ├─ NavBar.vue
│  │  └─ AppFooter.vue
│  ├─ project/
│  │  ├─ ProjectCard.vue
│  │  ├─ ProjectFilterBar.vue
│  │  └─ ProjectMeta.vue
│  ├─ game/
│  │  ├─ GameCard.vue
│  │  ├─ GameFilterBar.vue
│  │  └─ DifficultyBadge.vue
│  └─ about/
│     ├─ Timeline.vue
│     ├─ SkillMeter.vue
│     └─ ContactLinks.vue
├─ composables/
│  ├─ useFilters.ts
│  ├─ useSearch.ts
│  ├─ usePageMeta.ts
│  └─ useScrollTop.ts
├─ data/
│  ├─ projects.ts
│  ├─ games.ts
│  ├─ profile.ts
│  └─ taxonomy.ts
├─ pages/
│  ├─ Home.vue
│  ├─ Projects.vue
│  ├─ ProjectDetail.vue
│  ├─ Games.vue
│  ├─ GameDetail.vue
│  ├─ About.vue
│  └─ NotFound.vue
├─ router/
│  └─ index.ts
├─ store/
│  ├─ themeStore.ts
│  ├─ mainStore.ts
│  └─ uiStore.ts
├─ styles/
│  ├─ tokens.css
│  ├─ base.css
│  ├─ utilities.css
│  └─ animations.css
├─ types/
│  ├─ project.ts
│  ├─ game.ts
│  └─ profile.ts
├─ utils/
│  ├─ format.ts
│  └─ seo.ts
├─ App.vue
└─ main.ts

## 本地运行

建议 Node.js 版本：18+（推荐 20 LTS）。

```bash
npm install
npm run dev
````

默认开发地址：<http://localhost:5173>

## 构建与预览

```bash
npm run build
npm run preview
```

## 类型检查

```bash
npm run type-check
```

## 常见问题

- 启动报依赖缺失：请先执行 `npm install`，并确认命令在 `personal-portfolio` 目录下运行。
- 单独拷贝项目后无法运行：请保证带上 `package.json` 和 `package-lock.json`，然后重新安装依赖。
