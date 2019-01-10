import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';

// Login page
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');

// Dashboard
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue');
const Error = () => import(/* webpackChunkName: "404page" */ './views/404.vue');

const Admin = () => import(/* webpackChunkName: "admin" */ './components/Admin/Index.vue');

Vue.use(Router);

// const isAuthenticated = (to, from, next) => {
//   Store.dispatch('auth/authenticate')
//     .then(() => next())
//     .catch(() => next({ name: 'login' }));
// };


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*',
      name: 'error',
      component: Error,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        Store.dispatch('auth/authenticate')
          .then(() => next({ name: 'dashboard' }))
          .catch(next);
      },
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      // beforeEnter: isAuthenticated,
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: Admin,
          meta: { requiresAuth: true, permission: 'admin' },
          // beforeEnter: isAuthenticated,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth === true)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    Store.dispatch('auth/authenticate')
      .then(() => {
        const requiredPerm = to.matched.find(record => record.meta.permission);
        if (requiredPerm !== undefined) {
          if (Store.getters['users/current'][requiredPerm.meta.permission].is === true) {
            next();
          } else {
            next({ name: 'error' });
          }
        } else {
          next();
        }
      })
      .catch(() => {
        next({ name: 'login' });
      });
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
