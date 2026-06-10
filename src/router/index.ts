import { createRouter, createWebHistory } from "vue-router";
import guest from "./guest";
import dashboard from "./dashboard";
import settings from "./settings";
import { useAuthStore } from "@/store/auth";


const routes = [
	...guest,
	...dashboard,
	...settings,
]
console.log(routes)
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()
	const guestRoute = to.meta.permission === "guest";
	if (authStore.isLoggedIn || guestRoute) {
	  next();
	} else {
	  next({ name: "login" });
	}
  });
export default router;
