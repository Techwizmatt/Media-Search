import Vuex from 'vuex'
const boolify = require('boolify')
const Vue = require('vue').default

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: Number(),
      firstName: String(),
      lastName: String(),
      phone: String(),
      email: String(),
      plexInviteCode: String(),
      isPlexAccepted: false,
      firstLogin: true,
      isAdmin: false
    }
  },
  getters: {
    doGetUserId: state => {
      return state.user.id
    },
    doGetUserFirstName: state => {
      return state.user.id
    },
    doGetUserLastName: state => {
      return state.user.id
    },
    doGetUserPhone: state => {
      return state.user.id
    },
    doGetUserEmail: state => {
      return state.user.id
    },
    doGetUserPlexInviteCode: state => {
      return state.user.id
    },
    doGetUserPlexAccepted: state => {
      return state.user.isPlexAccepted
    },
    doGetUserFirstLogin: state => {
      return state.user.firstLogin
    },
    doGetUserIsAdmin: state => {
      return state.user.isAdmin
    }
  },
  mutations: {
    doSetUser (state) {
      state.count++
    }
  },
  actions: {
    doAuthenticate ({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        this.$services.auth.doSignIn(this.phoneNumber, this.code).then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('firstName', data.user.firstName)
          localStorage.setItem('firstName', data.user.lastName)
          localStorage.setItem('firstName', data.user.phone)
          localStorage.setItem('firstName', data.user.email)
          localStorage.setItem('firstName', data.user.plexInviteCode)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
