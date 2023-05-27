import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.js";
import { useLayoutStore } from "../stores/layout.js";

const routes = [
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
    path: "/support/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/auth/register/client",
    name: "register-client",
    component: () => import("../views/RegisterClientView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/register/agent",
    name: "register-agent",
    component: () => import("../views/RegisterAgentView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/find",
    name: "find",
    component: () => import("../views/FindView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/insert",
    name: "insert",
    component: () => import("../views/InsertView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/AccountView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/PostView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const layoutStore = useLayoutStore();
  layoutStore.hideSideMenu();

  if (!from.name && to.name !== "home") {
    next("/");
  } else {
    const userStore = useUserStore();
    if (to.meta.requiresAuth === true) {
      if (userStore.isLoggedIn) {
        next();
      } else {
        next("/auth/login");
      }
    } else if (to.meta.requiresAuth === false) {
      if (userStore.isLoggedIn) {
        next("/");
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
