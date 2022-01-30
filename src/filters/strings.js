const Filesize = require('filesize')
const Vue = require('vue').default
const moment = require('moment')

Vue.filter('fileSize', function (size = 0, round = 1) {
  if (size !== undefined && !isNaN(size)) {
    return Filesize(size, {
      round: round,
      base: 10
    })
  }
})

Vue.filter('ellipses', function (string, size = 250) {
  if (string !== undefined && string !== null && size !== undefined && !isNaN(size)) {
    return (string.length > size) ? string.substr(0, size - 1) + ' ...' : string
  }

  return string
})

Vue.filter('formatTimeFromSeconds', function (value = 0, format = 'HH:mm:ss') {
  return moment.utc(value * 1000).format(format)
})
