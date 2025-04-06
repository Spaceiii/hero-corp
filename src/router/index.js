import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrganizationList from "@/views/OrganizationList.vue";
import OrganizationDetail from "@/views/OrganizationDetail.vue";
import AuthView from "@/views/AuthView.vue";
import TeamList from "@/views/TeamList.vue";
import TeamDetail from "@/views/TeamDetail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/organizations',
    name: 'OrganizationList',
    component: OrganizationList
  },
  {
    path: '/organizations/:id',
    name: 'OrganizationDetail',
    component: OrganizationDetail,
    props: true
  },
  {
    path: '/teams',
    name: 'TeamList',
    component: TeamList
  },
  {
    path: '/teams/:id',
    name: 'TeamDetail',
    component: TeamDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
