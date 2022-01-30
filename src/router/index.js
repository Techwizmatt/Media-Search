const Vue = require('vue').default
const VueRouter = require('vue-router').default

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: require('@/app/pages/search').default,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/queue',
    component: require('@/app/pages/queue').default,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.fullPath === '/' && token) {
    next()
  } else if (to.matched.some(route => route.meta.requiresAuth && !token)) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
