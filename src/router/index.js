const Vue = require('vue').default
const VueRouter = require('vue-router').default

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: require('@/app/pages/auth').default,
    meta: {
      requiresAuth: false,
      showNav: false
    }
  },
  {
    path: '/welcome',
    component: require('@/app/pages/welcome').default,
    meta: {
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/search',
    component: require('@/app/pages/search').default,
    meta: {
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/media',
    component: require('@/app/pages/media').default,
    meta: {
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/queue',
    component: require('@/app/pages/queue').default,
    meta: {
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/admin',
    component: require('@/app/pages/admin').default,
    meta: {
      requiresAuth: true,
      showNav: true
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.fullPath === '/' && token) {
    next({ path: '/search' })
  } else if (to.matched.some(route => route.meta.requiresAuth && !token)) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
