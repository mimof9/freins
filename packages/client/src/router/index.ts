import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quine",
      name: "quine",
      // route level code-splitting
      // this generates a separate chunk (QuineView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/QuineView.vue"),
    },
    {
      path: "/terminal",
      name: "terminal",
      component: () => import("../views/TerminalView.vue"),
    },
    {
      path: "/gl",
      name: "gl",
      component: () => import("../views/GLView.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    },
  ],
});

export default router;
