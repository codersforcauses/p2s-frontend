import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';
import Login from './views/Login.vue';

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
