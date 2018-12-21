import Vue from 'vue';
import Router from 'vue-router';

// Login page
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');

// Dashboards
const Dashboard = () => import('./views/Dashboard.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      // children: [
      //   {},
      // ],
    },
  ],
});
