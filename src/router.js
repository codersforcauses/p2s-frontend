import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';

// Login page
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');

// Dashboard
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue');

Vue.use(Router);

const isAuthenticated = (to, from, next) => {
  Store.dispatch('auth/authenticate')
    .then(() => next())
    .catch(() => next('/login'));
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        Store.dispatch('auth/authenticate')
          .then(() => next('/'))
          .catch(() => next());
      },
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: isAuthenticated,
      // children: [
      //   {},
      // ],
    },
  ],
});
