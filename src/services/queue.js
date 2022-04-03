const http = require('@/middleware/axios').default

export default {
  doGetAll: async function () {
    return new Promise((resolve, reject) => {
      http.get('/queue').then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
