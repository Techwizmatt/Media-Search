const http = require('@/middleware/axios').default

export default {
  doCreate: async function (user) {
    return new Promise((resolve, reject) => {
      http.post('/users', user).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetPlexStatus: async function () {
    return new Promise((resolve, reject) => {
      http.get('/users/status/plex').then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
