<template>
  <section>
    <search @doSearch="doSearch" :isLoading="isLoading"/>
    <b-tabs class="mt-3" v-model="active" expanded>
      <b-tab-item label="TV Shows">
        <results :results="results.series" :isLoading="isLoading" @doReloadResults="doReloadResults"/>
      </b-tab-item>
      <b-tab-item label="Movies">
        <results :results="results.movies" :isLoading="isLoading" @doReloadResults="doReloadResults"/>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Search from '@/app/components/search'
import Results from '@/app/components/results'

export default {
  components: { Results, Search },
  data: () => ({
    isLoading: false,
    active: 0,
    currentQuery: String(),
    results: {
      series: [],
      movies: []
    }
  }),
  methods: {
    doSearch: function (query) {
      this.currentQuery = query
      this.isLoading = true

      this.$services.search.doGetQuery(query).then(data => {
        this.results = data
      }).catch(_ => {
        this.$buefy.toast.open({
          message: 'Unable to search for content',
          type: 'is-danger',
          duration: 3000
        })
      }).finally(_ => {
        this.isLoading = false
      })
    },
    doReloadResults: function () {
      this.doSearch(this.currentQuery)
    }
  }
}
</script>

<style scoped>

</style>
