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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If a saved position is available (e.g., from using the back button),
    // return to it for a better user experience on history navigation.
    if (savedPosition) {
      return savedPosition;
    }

    // Otherwise, scroll to the top of the page for new route changes.
    // Use 'smooth' behavior for an animated scroll, or 'auto' for an instant jump.
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

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
