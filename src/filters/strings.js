const Filesize = require('filesize')
const Vue = require('vue').default

Vue.filter('fileSize', function (size = 0, round = 1) {
  if (size !== undefined && !isNaN(size)) {
    return Filesize(size, {
      round: round,
      base: 10
    })
  }
})

Vue.filter('ellipses', function (string, size = 250) {
  if (string !== undefined && size !== undefined && !isNaN(size)) {
    return (string.length > size) ? string.substr(0, size - 1) + ' ...' : string
  }

  return string
})
