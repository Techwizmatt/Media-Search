import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'

require('@/assets/stylesheet.scss')
require('@/filters/strings')

const Vue = require('vue').default

Vue.config.productionTip = true

Vue.prototype.$http = require('@/middleware/axios').default
Vue.prototype.$chunk = require('chunk')
Vue.prototype.$services = require('@/services/index')

library.add(fas)
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.component('vue-headful', require('vue-headful').default)
Vue.use(require('vuelidate').default)
Vue.use(require('buefy').default, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'sm',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x'
      },
      iconPrefix: ''
    }
  }
})

Vue.mixin({
  computed: {},
  methods: {}
})

new Vue({
  router: require('@/router').default,
  render: h => h(require('@/App').default),
  created () {
    Vue.prototype.$http.interceptors.response.use((response) => response, (error) => {
      if (error) {
        if (this.$route.fullPath !== '/' && error.response.status === 401) {
          localStorage.removeItem('token')
          this.$router.push({ path: '/' })
        }

        return Promise.reject(error)
      }
    })
  }
}).$mount('#app')
