import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/support/help",
      name: "help",
      component: () => import("../views/HelpView.vue"),
    },
    {
      path: "/support/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/auth/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/find",
      name: "find",
      component: () => import("../views/FindView.vue"),
    },
    {
      path: "/insert",
      name: "insert",
      component: () => import("../views/InsertView.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/AccountView.vue"),
    },
  ],
});

export default router;
