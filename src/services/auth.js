const http = require('@/middleware/axios').default

export default {
  doRequestCode: async function (phoneNumber) {
    return new Promise((resolve, reject) => {
      http.get('/users/authenticate', {
        params: {
          phone: phoneNumber
        }
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doSignIn: async function (phoneNumber, code) {
    return new Promise((resolve, reject) => {
      http.post('/users/authenticate', {
        phone: phoneNumber,
        code: code
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
