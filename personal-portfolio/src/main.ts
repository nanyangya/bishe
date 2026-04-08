import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { applyInitialTheme } from "./store/themeStore";
import "animate.css";
import "./style.css";

applyInitialTheme();

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");