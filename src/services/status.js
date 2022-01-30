const http = require('@/middleware/axios').default

export default {
  doGetCurrent: async function () {
    return new Promise((resolve, reject) => {
      http.get('/status').then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetDownloads: async function () {
    return new Promise((resolve, reject) => {
      http.get('/status/downloads').then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
