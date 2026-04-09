import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../pages/Home.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/projects",
    component: () => import("../pages/Projects.vue"),
    meta: { title: "项目" },
  },
  {
    path: "/projects/:id",
    component: () => import("../pages/ProjectDetail.vue"),
    props: true,
    meta: { title: "作品详情" },
  },
  {
    path: "/games",
    component: () => import("../pages/Games.vue"),
    meta: { title: "游戏" },
  },
  {
    path: "/games/:id",
    component: () => import("../pages/GameDetail.vue"),
    meta: { title: "游戏详情" },
  },
  {
    path: "/about",
    component: () => import("../pages/About.vue"),
    meta: { title: "关于" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../pages/NotFound.vue"),
    meta: { title: "页面不存在" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  const base = "个人作品集";
  const title = typeof to.meta?.title === "string" ? `${to.meta.title} - ${base}` : base;
  document.title = title;
});

export default router;