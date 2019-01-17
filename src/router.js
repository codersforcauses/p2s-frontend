import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';

// Login page
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');

// Dashboard
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue');
const Error = () => import(/* webpackChunkName: "404page" */ './views/404.vue');

const Admin = () => import(/* webpackChunkName: "admin" */ './components/admin/Index.vue');
const Manager = () => import(/* webpackChunkName: "manager" */ './components/manager/Index.vue');
const Coach = () => import(/* webpackChunkName: "coach" */ './components/coach/Index.vue');

Vue.use(Router);

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
          .catch(() => next());
      },
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      beforeEnter(to, from, next) {
        if (to.fullPath === '/') {
          const user = Store.getters['users/current'];
          if (user.admin.is) {
            next({ name: 'admin' });
          } else if (user.manager.is) {
            next({ name: 'manager' });
          } else if (user.coach.is) {
            next({ name: 'coach' });
          } else {
            next({ name: 'error' });
          }
        } else {
          next();
        }
      },
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: Admin,
          meta: { permission: 'admin' },
        },
        {
          path: 'manager',
          name: 'manager',
          component: Manager,
          meta: { permission: 'manager' },
        },
        {
          path: 'coach',
          name: 'coach',
          component: Coach,
          meta: { permission: 'coach' },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth === true)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    try {
      await Store.dispatch('auth/authenticate');
    } catch {
      next({ name: 'login' });
    }
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
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
