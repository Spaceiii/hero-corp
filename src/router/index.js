import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrganizationList from "@/views/OrganizationList.vue";
import OrganizationDetail from "@/views/OrganizationDetail.vue";
import AuthView from "@/views/AuthView.vue";
import TeamList from "@/views/TeamList.vue";
import TeamDetail from "@/views/TeamDetail.vue";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
  {
    path: '/organizations',
    name: 'OrganizationList',
    component: OrganizationList,
    meta: { requiresAuth: true },
  },
  {
    path: '/organizations/:id',
    name: 'OrganizationDetail',
    component: OrganizationDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/teams',
    name: 'TeamList',
    component: TeamList,
    meta: { requiresAuth: true },
  },
  {
    path: '/teams/:id',
    name: 'TeamDetail',
    component: TeamDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.state.orgSecret !== null;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Auth' });
  } else {
    next();
  }
});

export default router
