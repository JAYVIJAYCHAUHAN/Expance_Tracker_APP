import { createRouter, createWebHistory } from "vue-router";
import Home from "@/Views/Home.vue";
import Summery from "@/Views/Summery.vue";
import Report from "@/Views/Report.vue";
import AppLayout from "@/Views/layouts/AppLayout.vue";
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import Dashboard from '@/Views/Dashboard.vue';
import Profile from '@/components/Profile.vue';
import Expence from "@/Views/Expence.vue";

const routes = [
  {
    path: "/",
    name: "AppLayout",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: "summery",
        name: "Summery",
        component: Summery,
      },
      {
        path: "report",
        name: "Report",
        component: Report,
      },
      {
        path: "expence",
        name: "Expence",
        component: Expence,
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: { requiresAuth: true }
      }
    ],
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import('@/Views/Subscription.vue'),
    meta: {
      requiresAuth: true,
      title: 'Subscription Plans'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
