const http = require('@/middleware/axios').default

export default {
  doAdd: async function (id) {
    return new Promise((resolve, reject) => {
      http.post('/series', {
        id: id
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
