module.exports = {
  auth: require('@/services/auth').default,
  search: require('@/services/search').default,
  status: require('@/services/status').default,
  series: require('@/services/series').default,
  movie: require('@/services/movie').default
}
