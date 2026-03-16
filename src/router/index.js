import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    name: "Login",
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    name: "Register",
  },
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
  } else if ((to.name == "Login" || to.name == "Register") && auth.token) {
    next("/");
  } else {
    next();
  }
});

export default router;
