import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import { usePostStore } from "../stores/postStore.js";
import { useAgentStore } from "../stores/agentStore.js";
import { useLayoutStore } from "../stores/layoutStore.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    beforeEnter: async (to, from, next) => {
      const layoutStore = useLayoutStore();
      const postStore = usePostStore();

      if (!from.name) {
        layoutStore.unhideLogoLoading();
      } else {
        layoutStore.unhideSpinnerLoading();
      }

      try {
        await postStore.getPopularSales();
        await postStore.getPopularRents();
        await postStore.getPopularExchanges();

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next();
      } catch (error) {
        console.log(error);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next("/");
      }
    },
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
    beforeEnter: async (to, from, next) => {
      const userStore = useUserStore();
      const layoutStore = useLayoutStore();

      if (!from.name) {
        layoutStore.unhideLogoLoading();
      } else {
        layoutStore.unhideSpinnerLoading();
      }

      try {
        await userStore.loadUserPosts();
        await userStore.loadUserFavorites();

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next();
      } catch (error) {
        console.log(error);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next("/");
      }
    },
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/PostView.vue"),
    beforeEnter: async (to, from, next) => {
      const postStore = usePostStore();
      const agentStore = useAgentStore();
      const layoutStore = useLayoutStore();

      if (!from.name) {
        layoutStore.unhideLogoLoading();
      } else {
        layoutStore.unhideSpinnerLoading();
      }

      try {
        await postStore.getPost(to.params.id);
        await agentStore.getAuthor(postStore.postState.uid);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next();
      } catch (error) {
        console.log(error);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        if (error.message === "Post not founded") {
          next({ name: "404" });
        } else {
          next("/");
        }
      }
    },
  },
  {
    path: "/post/edit/:id",
    name: "edit-post",
    component: () => import("../views/EditPostView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      const postStore = usePostStore();
      const layoutStore = useLayoutStore();

      if (!from.name) {
        layoutStore.unhideLogoLoading();
      } else {
        layoutStore.unhideSpinnerLoading();
      }
      try {
        await postStore.loadPost(to.params.id);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next();
      } catch (error) {
        console.log(error);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next("/");
      }
    },
  },
  {
    path: "/agents/:id",
    name: "agent",
    component: () => import("../views/AgentInfoView.vue"),
    beforeEnter: async (to, from, next) => {
      const userStore = useUserStore();
      const layoutStore = useLayoutStore();

      if (!from.name) {
        layoutStore.unhideLogoLoading();
      } else {
        layoutStore.unhideSpinnerLoading();
      }

      try {
        await userStore.loadAgentData(to.params.id);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next();
      } catch (error) {
        console.log(error);

        if (!from.name) {
          layoutStore.hideLogoLoading();
        } else {
          layoutStore.hideSpinnerLoading();
        }

        next("/");
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "not_found",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const layoutStore = useLayoutStore();
  layoutStore.hideSideMenu();

  const userStore = useUserStore();
  if (!from.name) {
    layoutStore.unhideLogoLoading();
    await userStore.refresh(true);
    layoutStore.hideLogoLoading();
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
