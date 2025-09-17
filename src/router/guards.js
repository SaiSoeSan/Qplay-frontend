// router/guards.js
import { useAuth } from "@/stores/auth";

export function setupRouterGuards(router) {
  router.beforeEach((to, from, next) => {
    const { isAuthenticated, isTeacher, isStudent } = useAuth();

    if (isAuthenticated.value) {
      // User is authenticated
      if (to.name === "Login" || to.name === "Register" || to.name === "Home") {
        // If isTeacher, redirect to teacher dashboard
        if (isTeacher.value) {
          return next({ name: "AdminHomeView" });
        }
        // If isStudent, redirect to student dashboard
        if (isStudent.value) {
          return next({ name: "StudentHomeView" });
        }
        return next({ name: "Home" }); // Redirect authenticated users away from login/register
      }
      if (to.name === "AdminHomeView" && !isTeacher.value) {
        return next({ name: "Home" }); // Prevent students from accessing admin routes
      }
      if (to.name === "StudentHomeView" && !isStudent.value) {
        return next({ name: "Home" }); // Prevent teachers from accessing student routes
      }
      return next();
    } else {
      // Not authenticated
      if (to.name === "Login" || to.name === "Register") {
        next(); // Allow access to login and register pages
      } else {
        next({ name: "Login" }); // Redirect to login
      }
    }
  });
}
