const http = require('@/middleware/axios').default

export default {
  doGetQuery: async function (query) {
    return new Promise((resolve, reject) => {
      http.get('/search', {
        params: {
          query: query
        }
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doShareMedia: async function (path) {
    return new Promise((resolve, reject) => {
      http.post('/search/share', {
        path: path
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
