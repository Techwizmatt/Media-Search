require('@/assets/stylesheet.scss')

const Vue = require('vue').default

Vue.config.productionTip = true

Vue.prototype.$http = require('@/middleware/axios').default
Vue.prototype.$services = require('@/services/index')

Vue.component('vue-headful', require('vue-headful').default)
Vue.use(require('vuelidate').default)
Vue.use(require('buefy').default, { defaultIconPack: 'fas' })

Vue.mixin({
  computed: {},
  methods: {}
})

new Vue({
  router: require('@/router').default,
  render: h => h(require('@/App').default)
}).$mount('#app')
