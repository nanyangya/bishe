import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    slug: "personal-portfolio-site",
    title: "个人网站作品",
    summary: "多页面响应式作品集站点",
    description: "使用 Vue 3 + TypeScript 构建的个人网站，支持主题切换与项目管理。",
    image: "https://picsum.photos/seed/project-1/960/600",
    category: "实战项目",
    tags: ["Vue3", "TypeScript", "Pinia", "Router"],
    links: {
      demo: "https://example.com/demo/portfolio",
      github: "https://github.com/yourname/personal-portfolio",
    },
    highlights: ["深色模式", "响应式布局", "路由懒加载"],
    date: "2026-03",
  },
  {
    id: 2,
    slug: "campus-info-tool",
    title: "校园信息管理工具",
    summary: "用于课程与任务追踪的前端工具",
    description: "支持任务看板、筛选和统计视图，提升日常学习流程效率。",
    image: "https://picsum.photos/seed/project-2/960/600",
    category: "工具类项目",
    tags: ["Vue3", "TS", "ECharts"],
    links: {
      demo: "https://example.com/demo/tool",
      github: "https://github.com/yourname/campus-tool",
    },
    highlights: ["筛选系统", "统计图表", "可扩展模块设计"],
    date: "2026-02",
  },
  {
    id: 3,
    slug: "learning-platform-clone",
    title: "学习平台仿站",
    summary: "前端课程学习阶段练手项目",
    description: "重点练习组件拆分、路由管理和接口联调，沉淀前端工程化经验。",
    image: "https://picsum.photos/seed/project-3/960/600",
    category: "学习项目",
    tags: ["Vue Router", "Axios", "CSS"],
    links: {
      demo: "https://example.com/demo/learn",
    },
    highlights: ["组件复用", "状态管理", "接口容错处理"],
    date: "2025-12",
  },
];