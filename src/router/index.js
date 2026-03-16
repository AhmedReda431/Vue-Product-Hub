import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/register", component: () => import("../views/Register.vue") },
  {
    path: "/",
    component: () => import("../views/ProductList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/product/:id",
    component: () => import("../views/ProductDetails.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) {
    next("/login");
  } else {
    next();
  }
  if (to.meta.requiresAuth && auth.token) {
    next("/");
  }
});

export default router;
