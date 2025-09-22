import { createRouter, createWebHistory } from "vue-router";
import { setupRouterGuards } from "./guards";

import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import StudentHomeView from "@/views/StudentHomeView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";
import CreateQuestionSetView from "@/views/CreateQuestionSetView.vue";
import QuestionSetDetailView from "@/views/QuestionSetDetailView.vue";
import EditQuestionSetView from "@/views/EditQuestionSetView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/admin/dashboard",
    name: "AdminHomeView",
    component: AdminHomeView,
  },
  {
    path: "/admin/question-sets/create",
    name: "CreateQuestionSet",
    component: CreateQuestionSetView,
  },
  {
    path: "/admin/question-sets/:id",
    name: "QuestionSetDetail",
    component: QuestionSetDetailView,
  },
  {
    path: "/admin/question-sets/:id/edit",
    name: "EditQuestionSet",
    component: EditQuestionSetView,
  },
  {
    path: "/student/dashboard",
    name: "StudentHomeView",
    component: StudentHomeView,
  },

  // Redirect any unmatched routes to home
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

setupRouterGuards(router);

export { router };
