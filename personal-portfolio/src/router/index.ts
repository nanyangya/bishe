import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Projects from "../pages/Projects.vue";
import ProjectDetail from "../pages/ProjectDetail.vue";
import About from "../pages/About.vue"; 

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/projects", component: Projects },
  { path: "/projects/:id", component: ProjectDetail, props: true },
  { path: "/about", component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;