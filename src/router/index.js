import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.js";
import { usePostStore } from "../stores/post.js";
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
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/auth/register/agent",
    name: "register-agent",
    component: () => import("../views/RegisterAgentView.vue"),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        next("/");
      } else {
        next();
      }
    },
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
    beforeEnter: async (to, from, next) => {
      const postStore = usePostStore();
      const layoutStore = useLayoutStore();

      layoutStore.unhideSpinner();
      try {
        await postStore.loadPost(to.params.id);
        layoutStore.hideSpinner();
        next();
      } catch (error) {
        console.log(error);
        layoutStore.hideSpinner();
        next("/");
      }
    },
  },
  {
    path: "/post/edit/:id",
    name: "edit-post",
    component: () => import("../views/EditPostView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/NotFund.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const layoutStore = useLayoutStore();
  layoutStore.hideSideMenu();

  const userStore = useUserStore();
  if (!from.name) {
    layoutStore.unhideLoading();
    await userStore.refreshToken(true);
    layoutStore.hideLoading();
  }

  if (to.meta.requiresAuth === true) {
    if (userStore.isLoggedIn) {
      next();
    } else {
      next("/auth/login");
    }
  } else {
    next();
  }
});

export default router;
