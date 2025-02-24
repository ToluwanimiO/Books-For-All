import { createRouter, createWebHistory } from "vue-router";

import guest from "./guest";
import dashboard from "./dashboard";
import settings from "./settings";


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
	const storage = localStorage.getItem("books4all-church-token");
	const token = storage ? JSON.parse(storage) : null;
  
	const guestRoute = to.meta.permission === "guest";
	let authenticatedRoute = true;
	let authenticatedUser = true;
  
	if (token) {
	  authenticatedRoute = to.meta.permission === "user";
	  authenticatedUser = true;
	}
	if (authenticatedUser || guestRoute) {
	  next();
	} else if (authenticatedRoute && !authenticatedUser) {
	  next({ name: "login" });
	} else {
	  next({ name: "login" });
	}
  });
export default router;
