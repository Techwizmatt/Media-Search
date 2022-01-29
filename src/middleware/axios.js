const axios = require('axios').default

const http = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  validateStatus: function (status) {
    if (status === 409) { return true }

    return status >= 200 && status < 302
  }
})

http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

export default http
