const http = require('@/middleware/axios').default

export default {
  doAdd: async function (id) {
    return new Promise((resolve, reject) => {
      http.post('/movie', {
        id: id
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetAll: async function () {
    return new Promise((resolve, reject) => {
      http.get('/movie').then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
