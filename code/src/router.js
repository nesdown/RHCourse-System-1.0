import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue';
import Trade from './views/Trade.vue';
import AdminServices from './views/AdminServices.vue';
import Login from './views/Login.vue';
import AdminSettings from './views/AdminSettings.vue';
import AdminTrades from './views/AdminTrades.vue';
import AdminDocs from './views/AdminDocs.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade
    },
    {
      path: '/admin',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next('/admin/services')
        } else next();
      }
    },
    {
      path: '/admin/services',
      name: 'services',
      component: AdminServices,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next()
        } else {
          next('/');
        }
      }
    },
    {
      path: '/admin/trades',
      name: 'trades',
      component: AdminTrades,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next()
        } else {
          next('/');
        }
      }
    },
    {
      path: '/admin/settings',
        beforeEnter(to, from, next) {
          if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
            next('/admin/settings/formulas')
          } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
            next(to);
          } else next('/');
        }
    },
    {
      path: '/admin/settings/formulas',
      name: 'formulas',
      component: AdminSettings,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
          next()
        } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
          next(to);
        } else next('/');
      }
    },
    {
      path: '/admin/settings/dropdowns',
      name: 'dropdowns',
      component: AdminSettings,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
          next()
        } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
          next(to);
        } else next('/');
      }
    },
    {
      path: '/admin/settings/users',
      name: 'users',
      component: AdminSettings,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
          next()
        } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
          next(to);
        } else next('/');
      }
    },
    {
      path: '/admin/settings/infofields',
      name: 'infofields',
      component: AdminSettings,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
          next()
        } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
          next(to);
        } else next('/');
      }
    },
    {
      path: '/admin/settings/records',
      name: 'recordsSettings',
      component: AdminSettings,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
          next()
        } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
          next(to);
        } else next('/');
      }
    },
    {
      path: '/admin/docs',
      name: 'docs',
      component: AdminDocs,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('is-admin'))) {
          next()
        } else if (localStorage.getItem('user-token') && !JSON.parse(localStorage.getItem('is-admin'))) {
          next(to);
        } else next('/');
      }
    },
    {
      path: '*',
      beforeEnter(to, from, next) {
        next('/');
      }
    }
  ]
})
